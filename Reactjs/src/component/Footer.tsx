import "./Footer.css";
import { LogoLight } from "../images";

function Footer() {
  return (
    <footer className="wrapper__footer">
      <div className="wrapper__footer__container">
        <div className="wrapper__footer__container__logo">
          <img src={LogoLight} alt="LOGO Light" />
        </div>
        <div className="wrapper__footer__container__contact">
          <h5>Contact us</h5>
          <div className="wrapper__footer__container__contact__info">
            <div>
              <i className="fas fa-paper-plane"></i>
              <p>Info@antoinedebes.codes</p>
            </div>
            <div>
              <i className="fas fa-phone"></i>
              <p>+961 71-876126</p>
            </div>
          </div>
        </div>
        <div className="wrapper__footer__container__location">
          <h5>Social Media</h5>
          <a
            href="https://github.com/AntoineDebes"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>
            <p>Github</p>
          </a>
        </div>
        <div className="wrapper__footer__container__location">
          <h5>Location</h5>
          <a
            href="https://goo.gl/maps/PiPiCwwbmZPzCAgn9"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-map-marker-alt"></i>
            <p>Jdeideh</p>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
