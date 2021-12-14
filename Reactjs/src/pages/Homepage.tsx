import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "./Homepage.css";
import { HeroImageOne } from "../images";
import HomepageCard from "../component/HomepageCard";
import Api from "../API";
import Footer from "../component/Footer";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";

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
                    <h3>{name}</h3>
                    <p>{content}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            }
          )}
        </Carousel>
      </div>
      <div className="wrapper__container">
        <div className="wrapper__container__hompage__hot-sales">Hot Sales</div>
        <div className="wrapper__container__homepage__hot-sales__container">
          {cards?.sales?.map(
            ({
              content,
              ImageFormat,
              Base64,
              imageAlt,
              price,
              name,
              ID,
            }: HomepageCardProps) => {
              return (
                <HomepageCard
                  content={content}
                  ImageFormat={ImageFormat}
                  Base64={Base64}
                  imageAlt={imageAlt}
                  price={price}
                  name={name}
                  key={ID}
                />
              );
            }
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Homepage;
