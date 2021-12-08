import { Carousel } from "react-bootstrap";
import "./Homepage.css";
import { HeroImageOne } from "../images";
import HomepageCard from "../component/HomepageCard";
import { Toshiba } from "../images";

function Homepage(): JSX.Element {
  return (
    <>
      <div className="wrapper__container__hero__container">
        <Carousel className="wrapper__container__hero">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={HeroImageOne}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={HeroImageOne}
              alt="Second slide"
            />

            <Carousel.Caption className="Carousel__caption__hero">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={HeroImageOne}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="wrapper__container">
        <div className="wrapper__container__hompage__hot-sales">Hot Sales</div>
        <div className="wrapper__container__homepage__hot-sales__container">
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
          <HomepageCard
            content="toshiba"
            image={Toshiba}
            imageAlt="tesT"
            price="123"
            title="sexy"
          />
        </div>
      </div>
    </>
  );
}

export default Homepage;
