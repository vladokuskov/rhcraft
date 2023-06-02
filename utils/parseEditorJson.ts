export interface EditorData {
  time: number
  blocks: {
    id: string
    data: {
      text: string
      url?: string
      style?: string
      items?: string[]
    }
    type: 'header' | 'paragraph' | 'youtubeEmbed' | 'list' | 'delimiter'
  }[]
  version: string
}

const parseEditorJson = async (
  data: EditorData | any,
): Promise<{ type: string; text: string }[]> => {
  return new Promise((resolve, reject) => {
    try {
      const blocks = data.blocks
      const parsedElements: {
        type: string
        text: string
        id?: string
        style?: string
        items?: string[]
      }[] = []

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
            const regex = /[?&]v=([^&]+)/
            const match = block.data.url.match(regex)
            const videoId = match && match[1]

            parsedElements.push({
              type: 'youtubeEmbed',
              text: '',
              id: videoId,
            })
          }
        } else if (block.type === 'list') {
          const listStyle = block.data.style
          const listItems = block.data.items

          let listType = 'unordered'

          if (listStyle === 'ordered') {
            listType = 'ordered'
          }

          parsedElements.push({
            type: 'list',
            text: '',
            style: listType,
            items: listItems,
          })
        } else if (block.type === 'delimiter') {
          parsedElements.push({ type: 'delimiter', text: '***' })
        }
      }

      resolve(parsedElements)
    } catch (error) {
      reject(error)
    }
  })
}

export { parseEditorJson }
