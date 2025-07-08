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
      <h2 className='highlight-title'>{highlight.title}</h2>
      <p className='hightlight-location'>{highlight.location}</p>
      <p className='hightlight-description'>{highlight.description}</p>
    </div>
  );
});