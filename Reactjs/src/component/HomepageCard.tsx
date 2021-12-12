import "./HomepageCard.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";

function HomepageCard({
  ImageFormat,
  Base64,
  imageAlt,
  name,
  price,
}: HomepageCardProps) {
  return (
    <div className="wrapper__container__homepage__cards">
      <div className="homepage__container__homepage__content">
        <h3>{name}</h3>
      </div>
      <div className="homepage__container__cards__img__container">
        <img src={`${ImageFormat},${Base64}`} alt={imageAlt} />
        <p>{price}</p>
      </div>
    </div>
  );
}

export default HomepageCard;
