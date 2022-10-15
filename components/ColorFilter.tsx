import React, { useMemo, useState } from 'react'
import { Filter, Product } from '../types';

type Props = {
  products: Product[],
  onChange: (filter: Filter) => void
}

const ColorFilter: React.FC<Props> = ({ products, onChange}) => {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());

  const colors = useMemo(() => {
    const colorsSet = new Set<string>();
    for (let product of products) {
      colorsSet.add(product.color);
    }
    return Array.from(colorsSet);
  }, [products]);

  const handleChange = (color: string, checked: boolean) => {
    const draft = structuredClone(selected);
    if (checked) {
      draft.add(color);
    } else {
      draft.delete(color);
    }

    onChange(draft.size ? product => draft.has(product.color) : null);

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
      <h4>Colors</h4>
      <ul style={{
        padding: 0,
        margin: 0,
        display: "flex",
        gap: "8px",
        flexDirection: "column"
      }}>
      {
        colors.map(color => (
          <li key={color} className="form-control" style={{
            display: "flex",
            gap: "10px",
          }}>
            <input onChange={(e) => handleChange(color, e.target.checked)} type="checkbox" name="color" id={`color-${color}`} />
            <label htmlFor={`color-${color}`}>{color.slice(0,1).toUpperCase() + color.slice(1)}</label>
          </li>
        ))
      }
      </ul>
    </div>
  )
};

export default ColorFilter;
