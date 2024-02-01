"use client"

import style from "../../../public/assets/styles/Donar.module.css"
import axios from "axios"
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import DialogDonar from "../DialogDonar";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation'


export default function DonarDetails(){
  

    const [visible, SetVisible] = useState(false)
    const [counter, SetCounter] = useState(0)
    const searchParams = useSearchParams();
    const param = useParams()
    const id = Number(param.id)
    const { user } = useContext(AuthContext);
    const { credential } = useContext(AuthContext);
    const router = useRouter()
    let institutionsFromlocalStorage = [];
    let filteredInstitutions = []
    
    if (typeof window !== 'undefined') {
        institutionsFromlocalStorage= JSON.parse(localStorage.getItem('institutions')) || [];
        filteredInstitutions = institutionsFromlocalStorage.filter(institution => institution.id === id);
    }
    
    console.log("filteredInstitutions",filteredInstitutions)
    console.log("id",id)
    if (credential === null) {
      router.push('/accounts/login');
   }

    const settings = {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        fade : false ,
   
        responsive: [
          {
            breakpoint: 1600,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 864,
            settings: {
              slidesToShow: 1,
              initialSlide: 1,
              arrows: false,
    
            },
          },
    
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              initialSlide: 1
            },
          },
          {
            breakpoint: 564,
            settings: {
              slidesToShow: 1,
              
    
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
               
             
            },
          },
        ],
      };
      const [institution, SetInstitution] = useState(institutionsFromlocalStorage.filter(institution => institution.id === id))
      const [gallery, SetGallery] = useState(institution[0]?.galleryInstitution)
      const [amount, SetAmount] = useState(institution[0]?.institution_osp)

   useEffect(() => { 
      institutions()
      }, [amount]);  

      useEffect(() => { 
        institutions()
       
        }, []);  
        
    

    const institutions = async () =>{
        const token = sessionStorage.getItem('access')
        console.log(token)
        console.log("Peticion")
        
        try {
            const response = await axios.get(`https://zona0.onrender.com/institutions/list-institution/${id}/`, { 
               headers: {
                   'Authorization': 'Bearer ' + token
               }
             });
             console.log(response.data)

             
              // Obtiene el objeto credential actual del localStorage
                let updatedAmount = JSON.parse(localStorage.getItem('institutions'));

                let filteredUpdatedAmount = updatedAmount.filter(institution => institution.id === id);
                console.log("filteredUpdatedAmount",filteredUpdatedAmount)

                // Actualiza los campos relevantes de credential
                filteredUpdatedAmount[0].institution_osp = response.data.institution_osp;

                // Guarda el objeto credential actualizado en el localStorage
                localStorage.setItem('institutions', JSON.stringify(updatedAmount));

                let filteredUpdated = JSON.parse(localStorage.getItem('institutions')).filter(institution => institution.id === id);

                console.log("consola",filteredUpdated)

                // Llama a updateCredential para actualizar el estado local
                SetInstitution(filteredUpdated)


                console.log("INSTITUTION",institution)


             /*SetInstitution(response.data)
             console.log("institutions",response.data)
             SetGallery(response.data.galleryInstitution)

             console.log(response.data.galleryInstitution)
             console.log(response.data.galleryInstitution.image) */
            
           } catch(error) {
            console.log(error.response);
           }    
         }


    return(
        <div className={style.cont}  >
            {visible && <DialogDonar SetActive = {SetVisible} institution= {id} user = {credential.pk} SetAmount = {SetAmount}/>}
            <div className={style.content} >
            
                <div className={style.header}/* data-aos="fade-up"*/>
                  <div className={style.line}></div>
                  <h3><Link href = "/dashboard/donar">Donar</Link> / {institution[0]?.institution_name}</h3>
                </div>


                <div className={style.frontImage}>
                  <div className={style.frontImageBx}>
                    <Image 
                              layout="fill"
                                objectFit="cover"
                      src = {institution[0]?.image}/>

                  </div>
                  <div className={style.nameInst}>
                    <h1>{institution[0]?.institution_name}</h1>
                    <div className={style.button}>
                      <button className={style.btn} onClick={() => {SetVisible(true)}}>Donar</button>
                    </div>

                  </div>
                </div>
                {gallery  ? <div className={style.imgBxGallery}>

                         {gallery.map((item, index) => 
                            <div className={style.ImageBxGallery} key = {index}>
                                <Image
                                layout="fill"
                                objectFit="cover"
                                src={item.image}
                                key = {index}
                                alt="properties identity"
                                />
                            </div>              
                            )}
                </div>: undefined}

               {/*<div className={style.infoDetails}>
                    <div className={style.imageBxDetail}>
                        
                     {gallery  ?
                     <div className={style.gallery}>
                        <Slider {...settings} >
                         {gallery.map((item, index) => 
                            <div className={style.images}>
                                <Image
                                layout="fill"
                                objectFit="cover"
                                src={item.image}
                                alt="properties identity"
                                />
                            </div>              
                            )}
                            </Slider>
                     </div>
                        : undefined}
                    </div>
                    

                </div>*/}

                {/*<div className={`${style.header} ${style.header1}`}>
                  <div className={style.line}></div>
                  <h3>About me</h3>
              </div>*/}
              <div className={style.about}>
                  <div className={style.descriptionDetail}>
                    <div className={`${style.header} ${style.header1}`}>
                      <h3>Sobre nosotros</h3>
                    </div>
                    <div className={style.descBx}>
                      {institution[0]?.description}
                    </div>
                        
                    </div>
                    <div className={style.bx}>
                        <div className={style.donado}>
                            <span>Cantidad donada hasta el momento:</span>
                            <div className={style.amount}>{institution[0]?.institution_osp} OSP</div>

                        </div>
                        <div className={style.button}>
                            <button className={style.btn} onClick={() => {SetVisible(true)}}>Donar</button>
                        </div>

                    </div>
              </div>
                
                
                
            </div>
        </div>
    )
}