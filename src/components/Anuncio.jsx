"use client"

import Link from "next/link"
import style from "../../public/assets/styles/Home.module.css"
import Image from "next/image"

export default function Anuncios({url}){

    return(
        <div className={style.anuncioImg}>
            <Image
             src={url} 
             alt=""
             layout="fill"
             objectFit="cover" // Ajusta la imagen para cubrir todo el contenedor
             objectPosition="center"
              />
        </div>
    )
}