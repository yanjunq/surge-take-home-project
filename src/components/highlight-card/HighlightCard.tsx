import './highlight-card.css'
import { observer } from 'mobx-react-lite'
import { Highlight } from '@/models/highlight'
import { HighlightImage } from '@/components/highlightImage/HighlightImage';
import { highlightStore } from '@/stores/HighlightStore';

type Props = {
  highlight: Highlight;
};

export const HighlightCard = observer(({ highlight }: Props) => {
  const imageUrl = highlightStore.imageUrlMap.get(highlight.id)
  return (
    <div className="highlight-card">
      <HighlightImage imageUrl={imageUrl} />
      <div className='highlight-header'>
        <p className='highlight-title'>{highlight.title}</p>
        <p className='hightlight-location'>{highlight.location}</p>
      </div>
      <p className='hightlight-description'>{highlight.description}</p>
    </div>
  );
});