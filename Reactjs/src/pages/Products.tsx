import "./Products.css";
import ProductCard from "../component/ProductCard";
import { useAppContext } from "../context/AppContext";
import { ProductCardProps } from "../Models/DataModels/ProductCardModel";

function Products() {
  const { productItems } = useAppContext();
  return (
    <div className="wrapper__container products__grid__container">
      <div className="wrapper__container__header">
        <h1>Our products</h1>
      </div>
      <section className="wrapper__container__products">
        {productItems?.sales.map((productItem: ProductCardProps) => {
          return <ProductCard key={productItem.ID} {...productItem} />;
        })}
        {productItems?.normal.map((productItem: ProductCardProps) => {
          return <ProductCard key={productItem.ID} {...productItem} />;
        })}
      </section>
    </div>
  );
}

export default Products;
