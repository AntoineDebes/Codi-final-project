import "./HomepageCard.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";

function HomepageCard({
  ImageFormat,
  Base64,
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
        <img src={`${ImageFormat},${Base64}`} alt={imageAlt} />
       

      </div>
      {deleteProduct && (
          <div
            className="homepage__container__cards__img__container__delete"
            onClick={() => deleteProduct(ID)}
          >
            Delete
          </div>
        )}
        <p className="homepage__container__cards__img__price">{price && "$"}{price}</p>
    </div>
  );
}

export default HomepageCard;
