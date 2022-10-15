import React, { useMemo, useState } from 'react'
import { Filter, Product } from '../types';

type Props = {
  onChange: (filter: Filter) => void
}

const PriceRangeFilter: React.FC<Props> = ({ onChange}) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(Infinity);

  const handleChangeMin = (value: number) => {
    setMin(value);

    onChange(value ? product => product.price >= value && (max ? product.price <= max : true) : null);
  }
  const handleChangeMax = (value: number) => {
    setMax(value);

    onChange(value ? product => product.price <= value && (min ? product.price >= min : true) : null);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #444",
        padding: "15px 20px",
        gap: "16px",
        marginBottom: "20px",
      }}
    >
      <h4>PriceRanges</h4>
      <div
        style={{
          padding: 0,
          margin: 0,
          display: "flex",
          gap: "10px",
          flexDirection: "row",
        }}
      >
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          <label style={{ display: "flex", gap: "10px" }} htmlFor="min">
            Min.
          </label>
          <input
            onChange={(e) => handleChangeMin(Number(e.target.value))}
            type="number"
            name="min"
            id="min"
          />
        </div>
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          <label style={{ display: "flex", gap: "10px" }} htmlFor="max">
            Máx.
          </label>
          <input
            onChange={(e) => handleChangeMax(Number(e.target.value))}
            type="number"
            name="max"
            id="max"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
