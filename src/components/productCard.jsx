"use client"

import style from "../../public/assets/styles/ProductCrad.module.css"
import { LuShoppingCart } from "react-icons/lu";


export default function ProductCard({url}) {
    
    return (
        <div className={style.card}>
            <div className={style.imgBx}>
                <img  src={url} alt="" />
                <span className={style.descont}>-10.00%</span>
            </div>
            <div className={style.detail}>
                <div className={style.label}>Label</div>
                <div className={style.description}>Description</div>
                <div className={style.price}>
                    <div className={style.priceRight}>$310.00</div>
                    <div className={style.priceDesc}>$345.00</div>
                </div>
                
                <div className={style.btnBx}>
                    <div className={style.icon}><LuShoppingCart /></div>
                    <div className={style.cart}>Lo quiero</div>
                </div>

            </div>


        </div>
    )
  }
  