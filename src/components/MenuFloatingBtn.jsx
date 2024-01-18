"use client"
import { useState, useEffect } from 'react';
import style from "../../public/assets/styles/MenuFloatingBtn.module.css";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import useMediaQuery from '../components/functions/MediaQuery';
import Link from "next/link"
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function MenuFloatinButton(){
 const [isOpen, setIsOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);
 const isMobile = useMediaQuery('(max-width: 768px)');

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 useEffect(() => {
    AOS.init({
      duration:100
  });
  const handleScroll = () => {
    const isScrolled = window.scrollY > window.innerHeight;
    setIsScrolled(isScrolled);

    
  };
    
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 return(
    <div className={style.FloatBtnCont}>
        {!isOpen && isScrolled && (
          <button className={style.btn} onClick={scrollToTop}>
            <IoIosArrowUp/>
          </button>
        )}
        {isMobile ? <button className={style.btn} onClick={() => setIsOpen(!isOpen)}>
          <MdOutlineMenu/> 
        </button>: ""}
        {isOpen && isMobile && (
          <div className={style.menu}  data-aos="fade-left">
            <div className={style.menuCont}>
              <ul>
               <li onClick={() => setIsOpen(false)}><Link Link href = "/dashboard/wallet" className={style.link}>Vista Principal</Link></li>
               <li onClick={() => setIsOpen(false)}><Link Link href = "/dashboard/enviar" className={style.link}>Enviar</Link></li>
               <li onClick={() => setIsOpen(false)}><Link Link href = "/dashboard/recibir" className={style.link}>Recibir</Link></li>
               <li onClick={() => setIsOpen(false)}><Link Link href = "/dashboard/guardar" className={style.link}>Bancarizar</Link></li>
               <li onClick={() => setIsOpen(false)}><Link href = "/dashboard/recompensa" className={style.link}>Cangear Codigo</Link></li>
              </ul>
            </div>
        </div>
        )}
    </div>
 )
}
