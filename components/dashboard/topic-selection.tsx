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
    <div className=" w-full inline-flex justify-start items-center gap-4 mb-2">
      <button
        className=" hover:opacity-80 transition-opacity"
        type="button"
        onClick={() => handleTopicChange('News')}
        title="Select News topic"
      >
        <PostTopicBadge topic="News" active={selectedTopic === 'News'} />
      </button>
      <button
        className=" hover:opacity-80 transition-opacity"
        type="button"
        onClick={() => handleTopicChange('Story')}
        title="Select Story topic"
      >
        <PostTopicBadge topic="Story" active={selectedTopic === 'Story'} />
      </button>
      <button
        className=" hover:opacity-80 transition-opacity"
        type="button"
        onClick={() => handleTopicChange('Puzzle')}
        title="Select Puzzle topic"
      >
        <PostTopicBadge topic="Puzzle" active={selectedTopic === 'Puzzle'} />
      </button>
    </div>
  )
}

export { TopicSelection }
