import style from "../../../public/assets/styles/Wallet.module.css"

export default function TransactionSend({res}){
    


    return (<div className={style.tranBx} /*onClick={() => {SetVisible(true);
                                                        setSelected(index)}}*/>
            <div className={style.tranCont}>
                <div className={style.detailBx}>
                    <div className={style.detail}>
                     {res['receive user']}
                    </div>
                    <div className={style.ts}>{res.date}, {res.time}</div>
                </div>
            </div>
            <div className={style.amount}>
               - {res['receive amount']} SOP
            </div>
        </div>
    )
}