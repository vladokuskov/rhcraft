export interface EditorData {
  time: number
  blocks: {
    id: string
    data: {
      text: string
    }
    type: 'header' | 'paragraph'
  }[]
  version: string
}

const parseEditorJson = async (
  data: EditorData | any,
): Promise<{ type: string; text: string }[]> => {
  return new Promise((resolve, reject) => {
    try {
      const blocks = data.blocks
      const parsedElements: { type: string; text: string }[] = []

      for (const block of blocks) {
        if (block.type === 'header') {
          const headerText = block.data.text
          parsedElements.push({ type: 'header', text: headerText })
        } else if (block.type === 'paragraph') {
          const paragraphText = block.data.text
          parsedElements.push({ type: 'paragraph', text: paragraphText })
        }
      }

      resolve(parsedElements)
    } catch (error) {
      reject(error)
    }
  })
}

export { parseEditorJson }
