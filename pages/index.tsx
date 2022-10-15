import type { NextPage } from "next";
import { useMemo, useState } from "react";
import { api } from "../api";
import { Filter, Product } from "../types";
import ColorFilter from "../components/ColorFilter";
import PriceRangeFilter from "../components/PriceRangeFilter";
import ProductCard from "../components/ProductCard";
import RatingFilter from "../components/RatingFilter";

const Home: NextPage<{products: Product[]}> = ({ products }) => {
  const [filters, setFilters] = useState<Record<string, Filter>>({
    price: null,
    color: null,
    rating: null
  });

  const matches = useMemo(() => {
    const filtersToApply = Object.values(filters).filter(Boolean);
    let matches = products;
    for (let filter of filtersToApply) {
      matches = matches.filter(filter!);
    }
    return matches;
  }, [products, filters])

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        alignItems: "baseline",
        gap: "30px",
        padding: "50px 30px"
      }}
    >
      <aside>
        <h3>Filtros</h3>
        <PriceRangeFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, price: filter }))}/>
        <ColorFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, color: filter }))} products={products}/>
        <RatingFilter onChange={(filter: Filter) => setFilters(filters => ({ ...filters, rating: filter }))} products={products}/>
      </aside>
      <section style={{ display: "grid", gap: "20px"}}>
        <h2>{matches.length} Resultados</h2>
        <div
          style={{
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))"
          }}
        >
          {
            matches.map(product => (
              <ProductCard product={product} key={product.id}/>
            ))
          }
        </div>
      </section>
    </main>
  );
};

export default Home;

export async function getStaticProps() {
  const products = await api.list();
  return {
    props: {
      products
    }
  }
}
