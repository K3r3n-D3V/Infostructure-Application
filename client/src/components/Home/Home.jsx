import React from "react";
import Navbar from "../NavBar/Navbar";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  // AiOutlineArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const productscreen = () => {
    navigate("/productscreen");
  };
  return (
    <div className="home">
      <Navbar />
      <div className="box">
        <div className="box2">
          <h1>
            Home sweet <span className="span">stylish</span> home.
          </h1>
          <p className="designers">
            A warm, welcoming sanctuary filled with personal touches and
            peaceful comfort
          </p>
          <button onClick={productscreen}>SHOP COLLECTION</button>
        </div>
        <div className="box2">
          <img src="../../Screens/home-pic1.jpg" alt="" className="zoom" />
        </div>
      </div>

      <div className="box3 designers">
        <h1>Explore our Curated Collections By Designers...</h1>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic1.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Sophia LeLor</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic2.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Marinette Dupeng-Cheng</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic3.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Agnes Levine</h1>
                {/* <p>Eye-catching accents to complete your look</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic4.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Patrick Dior</h1>
                {/* <p>Dreamy furniture fit for royalty</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic5.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Annabelle Ford</h1>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic6.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Lucrazia Santos</h1>
                {/* <p>Bathtubs, sinks and more to create a unique oasis of refreshment</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img src="../../Screens/pic7.jpg" alt="" />
              <div className="collection-info designer">
                <h1>Boketsu Peace</h1>
                {/* <p>Warm, inviting, culinary hub of creativity</p> */}
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/pic8.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info designer">
                <h1>Emma Bulore</h1>
                {/* <p>kjgvkyh</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="box3">
        <h1>Shop By Categories</h1>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-living-room.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Living Room</h1>
                <p>Sophisticated sofas, rugs and more</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-dining-room.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Dining Room</h1>
                <p>Tables, Chairs and more to help you set a city-chic scene</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-decor.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Decor & more</h1>
                <p>Eye-catching accents to complete your look</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/cat-bedroom.webp"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Bedroom</h1>
                <p>Dreamy furniture fit for royalty</p>
              </div>
            </div>
          </div>
        </div>
        <div className="collection">
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/babykids.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Baby & Kids</h1>
                <p>Let your little ones grow in comfort</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/bathroom.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Bathroom</h1>
                <p>
                  Bathtubs, sinks and more to create a unique oasis of
                  refreshment
                </p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/kitchen.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Kitchen</h1>
                <p>Warm, inviting, culinary hub of creativity</p>
              </div>
            </div>
          </div>
          <div className="collection-item">
            <div className="collection-pic">
              <img
                src="../../Screens/outdoor.jpg"
                alt=""
                onClick={productscreen}
              />
              <div className="collection-info">
                <h1>Outdoor</h1>
                <p>Be comfortable anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video">
        <video
          src="../../Screens/mixkit-white-luxury-boutique-hotel-room-4046-hd-ready.mp4"
          autoPlay
          loop
          mute
          controls
        ></video>
      </div>
      <div className="float">
        <div>
          <img src="../../Screens/home-faq-ic.png" alt="" />
        </div>
        <div>
          <img src="../../Screens/home-delivery-ic.png" alt="" />
        </div>
        <div>
          <Link to="./locations">
            <img src="../../Screens/home-track-ic.png" alt="" />
          </Link>
        </div>
        <div>
          <img src="../../Screens/home-loc-ic.png" alt="" />
        </div>
        <div>
          <img src="../../Screens/home-hts-ic.png" alt="" />
        </div>
      </div>
      <div className="more-info">
        <h3>Be the first to know about our best deals!</h3>
        <input type="checkbox" className="input2" />
        <label htmlFor="">All</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Furniture</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Appliances</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Decor</label>
        <input type="checkbox" className="input2" />
        <label htmlFor="">Specials</label>
        <div className="email-container"></div>
        <input
          type="email"
          className="email-input search-input"
          placeholder="Email Address"
        />
        {/* <AiOutlineArrowRight className="email-icon"/> */}
        {/* <FaArrowRight className="email-icon"/> */}
      </div>

      <div className="contact">
        <div className="contact-form">
          <div className="form">
            <h1>Contact Us</h1>
            <form action="">
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Email" required />
              <textarea name="message" id="" placeholder="Message"></textarea>
              <button type="submit">SEND</button>
            </form>
          </div>
        </div>
        <div className="contact-details">
          <div className="details">
            <h1>Our Information</h1>
            <p>
              <FaEnvelope /> infostructureWarehouse@gmail.com
            </p>
            <p>
              <FaPhoneAlt /> +44 98 55 736
            </p>
            <p>
              <FaMapMarkerAlt /> 12 Keren Street, Melview
            </p>
            <p>
              <FaClock /> 09:00 - 18:00
            </p>
            <div className="socials">
              <div className="social">
                <a href="https://x.com/?lang=en">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.6526 3.80762H43.3995L28.6594 20.6546L46 43.5796H32.4225L21.7881 29.6757L9.61989 43.5796H2.86886L18.6349 25.5598L2 3.80762H15.9222L25.5348 16.5163L36.6526 3.80762ZM34.2846 39.5412H38.0232L13.8908 7.63388H9.87892L34.2846 39.5412Z"
                      fill="#424242"
                    ></path>
                  </svg>
                </a>
                <a href="https://instagram.com/">
                  <img src="../../Screens/instagram-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.tiktok.com/en/">
                  <img src="../../Screens/tiktok-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.youtube.com/">
                  <img src="../../Screens/youtube-168-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://web.whatsapp.com/">
                  <img src="../../Screens/whatsapp-svgrepo-com.svg" alt="" />
                </a>
                <a href="https://www.facebook.com/">
                  <img src="../../Screens/facebook-svgrepo-com.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
