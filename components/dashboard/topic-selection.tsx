import clsx from 'clsx'
import { PostTopicBadge } from '../post-topic-badge'
import { Button } from '../button'

interface TopicSelection {
  handleTopicChange: (e: 'News' | 'Story' | 'Puzzle') => void
  selectedTopic: string | null
}

const TopicSelection = ({
  handleTopicChange,
  selectedTopic,
}: TopicSelection) => {
  return (
    <div className=" w-full flex flex-col justify-center items-start gap-2 mt-4">
      <p className="font-sans text-neutral-400 font-semibold text-lg">Topic</p>

      <div className=" w-full inline-flex justify-start items-center gap-4 font-sans font-semibold">
        <Button
          className="disabled:border-green-500 disabled:hover:border-green-500 focus:hover:border-green-500"
          variant="outline"
          onClick={() => handleTopicChange('News')}
          title="News"
          disabled={selectedTopic === 'News'}
        >
          News
        </Button>
        <Button
          className="disabled:border-green-500 disabled:hover:border-green-500 focus:hover:border-green-500"
          variant="outline"
          onClick={() => handleTopicChange('Story')}
          title="Story"
          disabled={selectedTopic === 'Story'}
        >
          Story
        </Button>
        <Button
          className="disabled:border-green-500 disabled:hover:border-green-500 focus:hover:border-green-500"
          variant="outline"
          onClick={() => handleTopicChange('Puzzle')}
          title="Puzzle"
          disabled={selectedTopic === 'Puzzle'}
        >
          Puzzle
        </Button>
      </div>
    </div>
  )
}

export { TopicSelection }
