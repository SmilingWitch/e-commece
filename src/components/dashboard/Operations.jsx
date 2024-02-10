import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import { FaBalanceScale } from "react-icons/fa";
import { IoGiftOutline } from "react-icons/io5";
import { BiDonateHeart } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";
import Link from "next/link"
import style from "../../../public/assets/styles/Wallet.module.css"

export default function Operation(){
    return(

        <div className={style.oppBx} data-aos="fade-up">

        <Link href = "/dashboard/recibir">
          <div className={style.opp}>
            <div>
              <LuArrowDownToLine/>
            </div>
            <span>Recibir</span>
          </div></Link>

          <Link href = "/dashboard/enviar">
          <div className={style.opp}>
            <div>
              <LuArrowUpFromLine/>
            </div>
            <span>Enviar</span>
          </div>
          </Link>

          <Link href = "/dashboard/guardar">
          <div className={style.opp}>
            <div>
              <FaBalanceScale />
            </div>
            <span>Bancarizar</span>
          </div>
          </Link>

          <Link href = "/dashboard/recompensa">
          <div className={style.opp}>
            <div>
              <IoGiftOutline />
            </div>
            <span>Canjear Codigo</span>
          </div>
          </Link>

          
          <div className={style.opp}>
            <div>
              <FaRegCreditCard />
            </div>
            <span>Tarjetas</span>
          </div>

          <Link href = "/dashboard/donar">
          <div className={style.opp}>
            <div>
              <BiDonateHeart/>
            </div>
            <span>Donar</span>
          </div>
          </Link>

        </div>
    )
}