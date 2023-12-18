"use client"
import { useState, useEffect } from 'react';
import style from "../../public/assets/styles/MenuFloatingBtn.module.css";
import { MdOutlineMenu } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import useMediaQuery from '../components/functions/MediaQuery';
import Link from "next/link"

export default function MenuFloatinButton(){
 const [isOpen, setIsOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);
 const isMobile = useMediaQuery('(max-width: 768px)');

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 useEffect(() => {
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
          <MdOutlineMenu /> 
        </button>: ""}
        {isOpen && isMobile && (
          <div className={style.menu}>
            <div className={style.menuCont}>
              <ul>
               <li><Link Link href = "/wallet" className={style.link}>Billetera OrcaStore</Link></li>
               <li><Link Link href = "/" className={style.link}>Ofertas</Link></li>
               <li><Link Link href = "/catalogo" className={style.link}>Catalogo</Link></li>
               <li><Link href = "/" className={style.link}>Preguntas frecuentes</Link></li>
              </ul>
            </div>
          {/* Aquí puedes agregar más elementos al menú */}
        </div>
        )}
    </div>
 )
}
