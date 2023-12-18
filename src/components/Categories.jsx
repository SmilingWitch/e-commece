"use client"
import style from "../../public/assets/styles/Btn.module.css"
import Link from "next/link"
import Image from "next/image"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function Categories(){

    

    const settings = {
        dots: false,
        arrows: false,
        slidesToShow: 10,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        fade : false ,
   
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 9,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 7,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 864,
            settings: {
              slidesToShow: 4,
              initialSlide: 1,
              arrows: false,
    
            },
          },
    
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              initialSlide: 1
            },
          },
          {
            breakpoint: 564,
            settings: {
              slidesToShow: 4,
              
    
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
               
             
            },
          },
        ],
      };


    


    return(
        <div className={style.btnBx}>
            <div className={style.slider}>
                <Slider {...settings}>
                <div className={style.slide}>
                    <div className={style.slideCont}> 
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Laptops
                        </span>
                    </div>
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Telefonos
                        </span>

                    </div>
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Camaras
                        </span>

                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Ropa
                        </span>

                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Mochilas
                        </span>
                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Ropa
                        </span>

                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Mochilas
                        </span>
                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Ropa
                        </span>

                    </div>
                    
                </div>
                <div className={style.slide}>
                    <div className={style.slideCont}>
                        <div className={style.imageBx}>
                            <Image 
                            src = "/assets/images/laptop.jpg"
                            alt="Picture of the author"
                            layout="fill"
                            objectFit="contain"
                            /> 
                        </div>
                        <span>
                            Mochilas
                        </span>
                    </div>
                    
                </div>
                
                </Slider>
            </div>
            
        </div> 
    );
}