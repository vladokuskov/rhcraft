import {
  faBook,
  faNewspaper,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

const PostTopicBadge = ({
  topic,
  active = false,
}: {
  topic: string
  active?: boolean
}) => {
  return (
    <div
      className={clsx(
        `font-inter py-1 px-2 rounded text-sm inline-flex gap-2 justify-center items-center font-bold border-2 border-transparent`,
        {
          'bg-yellow-300 text-yellow-700': topic === 'Puzzle',
          'bg-lime-300 text-lime-700': topic === 'Story',
          'bg-slate-300 text-slate-700': topic === 'News',
          '!bg-neutral-400 !text-neutral-600 ': active,
        },
      )}
    >
      <FontAwesomeIcon
        icon={
          topic === 'News'
            ? faNewspaper
            : topic === 'Story'
            ? faBook
            : topic === 'Puzzle'
            ? faPuzzlePiece
            : faNewspaper
        }
      />
      {topic}
    </div>
  )
}

export { PostTopicBadge }
