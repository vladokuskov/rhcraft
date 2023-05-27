export interface EditorData {
  time: number
  blocks: {
    id: string
    data: {
      text: string
      url?: string
    }
    type: 'header' | 'paragraph' | 'youtubeEmbed'
  }[]
  version: string
}

const parseEditorJson = async (
  data: EditorData | any,
): Promise<{ type: string; text: string }[]> => {
  return new Promise((resolve, reject) => {
    try {
      const blocks = data.blocks
      const parsedElements: { type: string; text: string; url?: string }[] = []

      for (const block of blocks) {
        if (block.type === 'header') {
          const headerText = block.data.text
          parsedElements.push({ type: 'header', text: headerText })
        } else if (block.type === 'paragraph') {
          const paragraphText = block.data.text
          const processedText = paragraphText.replace(
            /<a href="(.*?)"[^>]*>(.*?)<\/a>/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>',
          )
          parsedElements.push({ type: 'paragraph', text: processedText })
        } else if (block.type === 'youtubeEmbed') {
          if (block.data.url && block.data.url.includes('youtube.com')) {
            parsedElements.push({
              type: 'youtubeEmbed',
              text: '',
              url: block.data.url,
            })
          }
        }
      }

      resolve(parsedElements)
    } catch (error) {
      reject(error)
    }
  })
}

export { parseEditorJson }
