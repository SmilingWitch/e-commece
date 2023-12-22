"use client"
import style from "../../public/assets/styles/CartCard.module.css"
import Image from "next/image"
import {useState} from "react"
import {HiOutlineMinusSm, HiOutlinePlusSm} from "react-icons/hi"
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartCard(){

    const [formValue,setFormValue]=useState({share:1});
    const handleIncrement = () => {
      if (formValue.share + 1 <= 10) {
        setFormValue({...formValue, share: formValue.share + 1});
      }
    };

    const handleDecrement = () => {
        if (formValue.share - 1 >= 1) {
            setFormValue({...formValue, share: formValue.share - 1});
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value.replace(/,/g, '');
        setFormValue({...formValue, share: Number(value)});
    };


    return(
        <div className={style.card}>
            <div className = {style.images}>
                <Image 
                layout="fill"
                objectFit="cover" // Ajusta la imagen para cubrir todo el contenedor
                objectPosition="center" 
                src="/assets/images/wallpaperflare.com_wallpaper.jpg" alt="" />
            </div>
        <div className={style.details}>
            <div className={style.detailsCont}>
                <span>Details</span>
                <span>$30.00</span>
                <span>Total : $200.00</span>

            </div>
            

            <div className={style.actionsBx}>
            <div className={style.trash}><FaRegTrashAlt/></div>
            <div className={style.actions}>
                  <button className={style.btn} onClick={handleDecrement}><HiOutlineMinusSm/></button>
                    <div className={style.inputCont}>
                      <div className={style.input}>
                        <input
                          type="text"
                          name="share"
                          className={style.formControl}
                          required
                          value={formValue.share.toLocaleString()}
                          onChange={handleInputChange}
                          onKeyDown={(event) => {
                              const keyCode = event.keyCode;
                              const isNumber = (keyCode >= 48 && keyCode <= 57);
                              const isBackspace = (keyCode === 8);
                              if (!isNumber && !isBackspace) {
                                event.preventDefault();
                              }
                            }}
                        />
                      </div>
                    </div>
                  <button className={style.btn} onClick={handleIncrement}><HiOutlinePlusSm/></button>
               </div>
                
               
            </div>
        </div>


            
        </div>
    )
}