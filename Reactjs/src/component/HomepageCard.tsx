import "./HomepageCard.css";

interface HomepageCardProps {
  image: string;
  imageAlt: string;
  title: string;
  content: string;
  price: string;
}

function HomepageCard({ image, imageAlt, title, price }: HomepageCardProps) {
  return (
    <div className="wrapper__container__homepage__cards">
      <div className="homepage__container__homepage__content">
        <h3>{title}</h3>
      </div>
      <div className="homepage__container__cards__img__container">
        <img src={image} alt={imageAlt} />
        <p>{price}</p>
      </div>
    </div>
  );
}

export default HomepageCard;
