import "./HomepageCard.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";

function HomepageCard({
  image_path,
  imageAlt,
  name,
  price,
  deleteProduct,
  ID,
}: HomepageCardProps) {
  return (
    <div className="wrapper__container__homepage__cards">
      <div className="homepage__container__homepage__content">
        <h3>{name}</h3>
      </div>
      <div className="homepage__container__cards__img__container">
        <img src={image_path} alt={imageAlt} />
      </div>
      <div className="homepage__container__cards__delete-price--container">
        {deleteProduct && (
          <div
            className="homepage__container__cards__img__container__delete"
            onClick={() => deleteProduct(ID)}
          >
            Delete
          </div>
        )}
        <p className="homepage__container__cards__img__price">
          {price && "$"}
          {price}
        </p>
      </div>
    </div>
  );
}

export default HomepageCard;
