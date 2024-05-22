import "./Home.css"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Home = () =>{
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  
  const settings = {
    arrows:false,
    dots: false,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1,
  };

    return(
      <>
      <section className="guide-cards">
        <div id="first_card"><p>You can form your own list of books! </p>
        <p>List is editable: you can add books, delete them, and also track completed pages!</p>
        </div>
        <div id="second_card">
        <img src={`/Images/poster.jpg`} alt="cant" width="300px" height="400px"/>
        </div>
        <div id="third_card"><p>You can also search books!</p>
        <p>Search by author, title, or subject! Sort results by rate! And of course, add books to your list</p></div>
      </section>
      <footer>
      <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={`/Images/${image}.jpg`} alt="cant" width="195px" height="270px"/>
          </div>
        ))}
      </Slider>
    </div>
      </footer>
      
      </>
    )
  }
  
  export default Home;