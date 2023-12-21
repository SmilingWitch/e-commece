"use client"
import style from "../../public/assets/styles/Cart.module.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import CartCard from "./CartCars";

export default function Cart({SetCart}){
    return(
        
            <div className={style.cart} onClick = {() => SetCart(false)}>
                <div className={style.cont} onClick = {(event) => {
                                                            event.stopPropagation();
                                                        }}>
                    <div className={style.header}>
                        <div className={style.header1}>
                            <h2>Mi carrito</h2>
                            <span>Productos()</span>
                            <button>
                                <FaRegTrashAlt className={style.icon}/>
                                <span>Vaciar el carrito</span>
                            </button>
                        </div>

                        <div>
                           <VscClose className={style.icon} onClick = {() => SetCart(false)}/> 
                        </div>
                    </div>

                    <div className={style.cartCardBx}>
                        <div className={style.bx}>
                            <CartCard/>
                            <CartCard/>
                            <CartCard/>


                        </div>
                    </div>

                    <div className={style.bottom}>

                    </div>
                    

            </div>
           
        </div>
    )
}