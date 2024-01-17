import style from "../../../public/assets/styles/Wallet.module.css"
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";

export default function Transaction({res}){
    return (
        res.state === "Unpaid" ? 
        <div className={style.tranBx}>
            <div className={style.tranCont}>
                
                <div className={style.detailBx}>
                    <div className={style.detail}>
                        {res.code}
                    </div>
                    <div className={style.ts}>{res.date}, {res.time}</div>
                </div>
            </div>
            
            <div className={style.amount}>
               - {res.amount} GOP
            </div>
        </div> 
        
        : 

        <div className={style.tranBx}>
            <div className={style.tranCont}>
                <div className={style.detailBx}>
                    <div className={style.detail}>
                    {res.code}
                    </div>
                    <div className={style.ts}>{res.date}, {res.time}</div>
                </div>
            </div>
            <div className={style.amount}>
            {res.amount} GOP
            </div>
        </div>
    )
}