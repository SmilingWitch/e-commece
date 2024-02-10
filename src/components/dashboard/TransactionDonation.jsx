import style from "../../../public/assets/styles/Wallet.module.css"

export default function TransactionDonations({res}){
    


    return (<div className={style.tranBx} >
            <div className={style.tranCont}>
                <div className={style.detailBx}>
                    <div className={style.detail}> 
                     {res.institution}
                    </div>
                    <div className={style.ts}>{res.user}</div>
                </div>
            </div>
            <div className={style.amount}>
                {res.amount} SOP
            </div>
        </div>
    )
}