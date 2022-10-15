import React, { useMemo, useState } from 'react'
import { Filter, Product } from '../types';

type Props = {
  products: Product[],
  onChange: (filter: Filter) => void
}

const RatingFilter: React.FC<Props> = ({ products, onChange}) => {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  const handleChange = (rating: number, checked: boolean) => {
    const draft = structuredClone(selected);
    if (checked) {
      draft.add(rating);
    } else {
      draft.delete(rating);
    }

    onChange(draft.size ? product => draft.has(product.rating) : null);

    setSelected(draft);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      border: "1px solid #444",
      padding: "15px 20px",
      gap: "16px",
      marginBottom: "20px"
    }}>
      <h4>Ratings</h4>
      <ul style={{
        padding: 0,
        margin: 0,
        display: "flex",
        gap: "8px",
        flexDirection: "column"
      }}>
      {
        [1,2,3,4,5].map(rating => (
          <li key={rating} className="form-control" style={{
            display: "flex",
            gap: "10px",
          }}>
            <input onChange={(e) => handleChange(rating, e.target.checked)} type="checkbox" name="rating" id={`rating-${rating}`} />
            <label style={{display: "flex", gap: "10px"}} htmlFor={`rating-${rating}`}><span>{rating}</span><span>{'★'.repeat(rating).padEnd(5, '☆')}</span></label>
          </li>
        ))
      }
      </ul>
    </div>
  )
};

export default RatingFilter;
