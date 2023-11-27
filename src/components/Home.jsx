"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from "../../public/assets/styles/Home.module.css"
import ProductCard from "./productCard";
import Anuncios from "./Anuncio";
import Contact from "./Contact";


export default function Home() {


    const settings = {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        fade : false ,
   
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 864,
            settings: {
              slidesToShow: 1,
              initialSlide: 1,
              arrows: false,
    
            },
          },
    
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              initialSlide: 1
            },
          },
          {
            breakpoint: 564,
            settings: {
              slidesToShow: 1,
              
    
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
               
             
            },
          },
        ],
      };


    return (
        <div className={style.cont}>
            <div className= {style.slider}>
                <div className={style.sliderBx}>
                    <Slider {...settings}>
                        <div className = {style.images}>
                            <img  src="/assets/images/annie-spratt-hS46bsAASwQ-unsplash.jpg" alt="" />
                        </div>
                        <div className = {style.images}>
                            <img  src="/assets/images/gilles-lambert-mSK5nNsAsLY-unsplash.jpg" alt="" />
                        </div>
                        <div className = {style.images}>
                            <img  src="/assets/images/annie-spratt-hS46bsAASwQ-unsplash.jpg" alt="" />
                        </div>
                        <div className = {style.images}>
                            <img  src="/assets/images/wallpaperflare.com_wallpaper.jpg" alt="" />
                        </div>
                    </Slider>
                </div>
                
            </div>
            <div className={style.header}>
                <div className={style.line}></div>
                <h3>Nuestras sugerencias</h3> 
            </div>
            {/*<div className={style.categoriesBx}>
                
                <div className={style.categories}>
                    <div className={style.img}><img src="" alt="" /></div>
                    <div className={style.name}>Laptops</div>
                </div>

            </div>*/}
            <div className={style.cardBx}>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
            </div>

            <Anuncios url = "/assets/images/annie-spratt-hS46bsAASwQ-unsplash.jpg"/>

            <div className={style.header}>
                <div className={style.line}></div>
                <h3>Lo mas popular</h3> 
            </div>

            <div className={style.cardBx}>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
            </div>

            <Anuncios url = "/assets/images/annie-spratt-hS46bsAASwQ-unsplash.jpg"/>
            
            <div className={style.header}>
                <div className={style.line}></div>
                <h3>Lo mas reciente</h3> 
            </div>

            <div className={style.cardBx}>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
                <ProductCard url = "/assets/images/laptop.jpg"/>
            </div>

            <Anuncios url = "/assets/images/annie-spratt-hS46bsAASwQ-unsplash.jpg"/>

            <Contact/>
        </div>
    )
  }
  