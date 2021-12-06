interface ProductCardProps {
  image: string;
  imageAlt: string;
  title: string;
  content: string;
  price: string;
}

function ProductCard({
  image,
  imageAlt,
  title,
  content,
  price,
}: ProductCardProps) {
  return (
    <div className="wrapper__container__products__cards">
      <div className="products__container__cards__img__container">
        <img src={image} alt={imageAlt} />
        <p>{price}</p>
      </div>
      <div className="products__container__cards__content">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}

export default ProductCard;
