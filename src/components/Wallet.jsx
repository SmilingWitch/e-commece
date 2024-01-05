"use client"
import style from "../../public/assets/styles/Wallet.module.css"
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import { BiDonateHeart } from "react-icons/bi";
import Transaction from "./Transaction";
import {useState} from "react"
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Image from "next/image"
import Link from "next/link"

export default function Wallet() {
  const { user } = useContext(AuthContext);
  const [showTransactions, setShowTransactions] = useState(10);

  const showMoreTransactions = () => {
    setShowTransactions(prevTransactions => prevTransactions + 10);
   };

   const showLessTransactions = () => {
    setShowTransactions( 10);
   };

  const transactions = [
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "kuewhfbroc7843q"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "wqeyui2b1982"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "uy2txev3162"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "9liunenf3ghp8"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "o18i2u3emp893"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "89e8nrct43r9"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "oinds782863e"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "mx9p82uy338uyr8"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "iuye08x723b"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "oekixmi[0923m8m"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "po931iuem"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : ";powmqde[82903"},
    {detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "iuqytbe872"},
  ]


    return (
        user !== null ?<div className={style.cont} >
          <div className={style.header}>
            <div className={style.line}></div>
            <h3>Operaciones</h3> 
          </div>

          <div className={style.operations}>
            <div className={style.total}>
              <span>400 ZOP</span>
            </div>
            <div className={style.oppBx}>

              <div className={style.opp}>
                <div>
                  <LuArrowDownToLine/>
                </div>
                <span>Recibir</span>
              </div>

              <div className={style.opp}>
                <div>
                  <LuArrowUpFromLine/>
                </div>
                <span>Enviar</span>
              </div>

              <div className={style.opp}>
                <div>
                  <BiDonateHeart/>
                </div>
                <span>Donar</span>
              </div>

            </div>

          </div>

          <div className={style.header}>
            <div className={style.line}></div>
            <h3>Transacciones</h3> 
          </div>

          <div className={style.options}>
            <div className={style.transactions}>
            {transactions.slice(0, showTransactions).map(transaction => (
             <Transaction key={transaction.id} {...transaction} />
            ))}

             {showTransactions > 10 ?<button onClick={showLessTransactions}>Ver menos</button> :<button onClick={showMoreTransactions}>Ver más</button>}

            </div>
          </div>
          
          
        </div> :
        <div className={style.cont1}>
          <Image src = "/assets/images/undraw_login_re_4vu2.svg" width = {300} height={300}></Image>
          <div className={style.subHeader}>
            Debe autenticarse primero
          </div>
          <Link href = "/accounts/login"><button>Autenticarse</button></Link>
        </div>
    )
  }
  