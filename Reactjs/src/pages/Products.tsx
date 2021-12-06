import "./Products.css";
import ProductCard from "../component/ProductCard";
import { Toshiba } from "../images";

function Products() {
  return (
    <div className="wrapper__container">
      <div className="wrapper__container__header">
        <h1>Laptops</h1>
      </div>
      <section className="wrapper__container__products">
        <ProductCard
          content="hello"
          image={Toshiba}
          imageAlt="sex"
          title="Toshiba"
          price="20$"
        />
      </section>
    </div>
  );
}

export default Products;
