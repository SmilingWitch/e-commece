import style from "../../../public/assets/styles/Wallet.module.css"

export default function Transaction({res, SetVisible,setSelected,setDialog, visible, index}){
    


    return (
        res.state === "Unpaid" ? 
        <div className={style.tranBx} onClick={() => {SetVisible(true);
                                                        setSelected(index)}} >
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
        
        : 

        <div className={style.tranBx} /*onClick={() => {SetVisible(true);
                                                        setSelected(index)}}*/>
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