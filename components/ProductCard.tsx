import { Product } from "../types";
import Image from "next/image";

type ProductCardProps = {
  product: Product,
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <article
      style={{
        border: "1px solid #333",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <Image layout="responsive" width="640" height="480" src={product.image} alt={product.name}/>
      <h3>{product.name}</h3>
      <p>Valoración: {'★'.repeat(product.rating).padEnd(5, '☆')}</p>
      <p>{product.price.toLocaleString('es-UY', {style: "currency", currency: "UYU"})}</p>
    </article>
  );
}

export default ProductCard;
