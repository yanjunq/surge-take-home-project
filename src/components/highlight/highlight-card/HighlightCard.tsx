import { Highlight } from '@/models/highlight'
import { HighlightImage } from '@/components/highlightImage/HighlightImage';

type Props = {
  highlight: Highlight;
};

export function HighlightCard({ highlight }: Props) {
  return (
    <div className="highlight-card">
      <HighlightImage imageUrl={highlight.imageUrl}></HighlightImage>
      <h2 className="text-xl font-semibold">{highlight.title}</h2>
      <p className="text-sm text-gray-600">{highlight.location}</p>
      <p className="text-gray-800">{highlight.description}</p>
    </div>
  );
}
