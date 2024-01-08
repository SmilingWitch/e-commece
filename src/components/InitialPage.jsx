"use client"

import style from "../../public/assets/styles/InitialPage.module.css"
import { useState, useEffect} from "react";
import BeatLoader from "react-spinners/BeatLoader"
import { useRouter } from 'next/navigation'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  


export default function InitialPage(){
    const router = useRouter()
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    
    useEffect(() => {
        const timer = setTimeout(() => {
          router.push('/dashboard/wallet');
        }, 5000);
     
        return () => clearTimeout(timer);
      }, [router]);


return(


    <div className={style.cont}>
        <div className={style.logo}>
            <img src="/assets/images/[removal.ai]_597ed435-d169-410c-962e-7dbf022aae9f-photo1702144866.png" alt="" />
            <span>rca Store</span>
        </div>
        <div className={style.spinner}>
            <div className="sweet-loading">
                <BeatLoader
                  color="rgba(255, 68, 0,1)"
                  cssOverride={{}}
                  margin={20}
                  size={15}
                  speedMultiplier={1}
                />
            </div>
        </div>
    </div>

)
    
}