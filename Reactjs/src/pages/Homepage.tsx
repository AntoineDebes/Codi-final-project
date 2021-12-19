import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./Homepage.css";
import HomepageCard from "../component/HomepageCard";
import Api from "../API";
import Footer from "../component/Footer";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";
import ProductCard from "../component/ProductCard";
import { ProductCardProps } from "../Models/DataModels/ProductCardModel";

function Homepage(): JSX.Element {
  const [cards, setCards] = useState<any>(undefined);

  useEffect(() => {
    Api({ method: "GET", fetchApiUrl: "products" }).then((res: any) => {
      console.log(res);

      setCards(res.data);
    });
  }, []);

  return (
    <>
    <main>
      <div className="wrapper__container__hero__container">
        <Carousel className="wrapper__container__hero">
          {cards?.hero.map(
            ({ content, ImageFormat, Base64, ID, name }: HomepageCardProps) => {
              return (
                <Carousel.Item key={ID}>
                  <img
                    className="d-block w-100"
                    src={`${ImageFormat},${Base64}`}
                    alt="Second slide"
                  />

                  <Carousel.Caption className="Carousel__caption__hero">
                    <h3 className="Carousel__caption__hero__title">{name}</h3>
                    <p>{content}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            }
          )}
        </Carousel>
      </div>
      <div className="wrapper__container">
        <div className="wrapper__container__hompage__hot-sales">
          <h2 className="wrapper__container__hompage__hot-sales__title">
            Hot Sales
          </h2>
        </div>
        <div className="wrapper__container__homepage__hot-sales__container">
          {cards?.sales?.map(
            ({
              ID,
              content,
              name,
              price,
              packaging,
              serial_number,
              quantity,
              transport,
              ImageFormat,
              Base64,
            }: ProductCardProps) => {
              return (
                <ProductCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt="Image"
                name={name}
                price={price}
                key={ID}
                ID={ID}
                packaging={packaging}
                serial_number={serial_number}
                quantity={quantity}
                transport={transport}
                />
              );
            }
          )}
        </div>
      </div>
      </main>
    </>
  );
}

export default Homepage;
