import style from "../../../public/assets/styles/Donar.module.css"
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function InstitutionCard({res}){
    console.log("name", res.institution_name)
    const router = useRouter()
    const wordLimit = 23;
    const words = res.description.split(" ");
    const limitedDescription = words.slice(0, wordLimit).join(" ");
    
    
    return (
        <div className={style.card}>
            <div className={style.imageBx}>
               {res.image !== null ? <Image 
                    layout="fill"
                    objectFit="cover"
                    src={res.image} /*"/assets/images/gilles-lambert-mSK5nNsAsLY-unsplash.jpg"*/
                    alt="Descripción de la imagen"/>: <Image 
                    layout="fill"
                    objectFit="cover"
                    src="/assets/images/defaultDonation.jpg"
                    alt="Descripción de la imagen"/>}
            </div>
            <div className={style.info}>
                <div className={style.bxCard}>
                    <div className={style.name}>
                        {res.institution_name}
                    </div>
                    {/*<div className={style.osp}>
                       Cantidad minima: {res.institution_osp}
                    </div>*/}
                    <div className={style.description}>
                       {limitedDescription}

                       {
                        words.length > 23 ? <span>...</span> : ""
                       }
                    </div>

                </div>
                
               
                <button className={style.btn} onClick={() => {router.push(`/dashboard/donar/${res.id}`)}}>Visitar</button>
            </div>
        </div>
    )
}