"use client"

import Link from "next/link"
import style from "../../public/assets/styles/Home.module.css"


export default function Anuncios({url}){

    return(
        <div className={style.anuncioImg}>
            <img src={url} alt="" />
        </div>
    )
}