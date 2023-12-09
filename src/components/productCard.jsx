"use client"

import style from "../../public/assets/styles/ProductCrad.module.css"
import { LuShoppingCart } from "react-icons/lu";
import {HiOutlinePlusSm, HiOutlineMinusSm} from "react-icons/hi"
import { useState } from "react";


export default function ProductCard({url}) {

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
    
    return (
        <div className={style.card}>
          <div className={style.top}>
            <div className={style.imgBx}>
                  <img  src={url} alt="" />
                  <span className={style.descont}>-10.00%</span>
              </div>
              <div className={style.detail}>
                  <div className={style.label}>Label</div>
                  <div className={style.description}>Description</div>
                  <div className={style.price}>
                      <div className={style.priceDesc}>$345.00</div>
                      <div className={style.priceRight}>$310.00</div>
                  </div>

                </div>
          </div>
            

          <div className={style.buySection}>
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
              <div className={style.btnBx}>
                  <div className={style.icon}><LuShoppingCart /></div>
                  <div className={style.cart}>Lo quiero</div>
              </div>
          </div>


        </div>
    )
  }
  