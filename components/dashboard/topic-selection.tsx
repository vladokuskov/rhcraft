import clsx from 'clsx'
import { PostTopicBadge } from '../post-topic-badge'

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
        <button
          className={clsx(
            'py-2 px-4 border-2 border-neutral-600 rounded hover:border-neutral-400 focus:border-neutral-400 transition-colors',
            'disabled:border-green-500',
          )}
          type="button"
          onClick={() => handleTopicChange('News')}
          title="News"
          disabled={selectedTopic === 'News'}
        >
          News
        </button>
        <button
          className={clsx(
            'py-2 px-4 border-2 border-neutral-600 rounded hover:border-neutral-400 focus:border-neutral-400 transition-colors',
            'disabled:border-green-500',
          )}
          type="button"
          onClick={() => handleTopicChange('Story')}
          title="News"
          disabled={selectedTopic === 'Story'}
        >
          Story
        </button>
        <button
          className={clsx(
            'py-2 px-4 border-2 border-neutral-600 rounded hover:border-neutral-400 focus:border-neutral-400 transition-colors',
            'disabled:border-green-500',
          )}
          type="button"
          onClick={() => handleTopicChange('Puzzle')}
          title="News"
          disabled={selectedTopic === 'Puzzle'}
        >
          Puzzle
        </button>
      </div>
    </div>
  )
}

export { TopicSelection }
