import style from "../../../public/assets/styles/Wallet.module.css"
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";

export default function Transaction({type, detail,amount,ts}){
    return (
        type === "gasto" ? 
        <div className={style.tranBx}>
            <div className={style.tranCont}>
                <div className={style.icon}><HiOutlineArrowTrendingDown/></div>
                <div className={style.detailBx}>
                    <div className={style.detail}>
                        {detail}
                    </div>
                    <div className={style.ts}>{ts}</div>
                </div>
            </div>
            
            <div className={style.amount}>
               - {amount} GOP
            </div>
        </div> 
        
        : 

        <div className={style.tranBx}>
            <div className={style.tranCont}>
                <div className={style.icon}><HiOutlineArrowTrendingUp/></div>
                <div className={style.detailBx}>
                    <div className={style.detail}>
                        {detail}
                    </div>
                    <div className={style.ts}>{ts}</div>
                </div>
            </div>
            <div className={style.amount}>
                {amount} GOP
            </div>
        </div>
    )
}