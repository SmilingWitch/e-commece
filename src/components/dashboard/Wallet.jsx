"use client"
import style from "../../../public/assets/styles/Wallet.module.css"
import { LuArrowDownToLine, LuArrowUpFromLine } from "react-icons/lu";
import Transaction from "./Transaction";
import {useState} from "react"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Image from "next/image"
import Link from "next/link"
import { SiMicrosoftexcel } from "react-icons/si";

export default function Wallet() {
  const { user } = useContext(AuthContext);
  const [showTransactions, setShowTransactions] = useState(30);

  /*const showMoreTransactions = () => {
    setShowTransactions(prevTransactions => prevTransactions + 20);
   };*/

   const showLessTransactions = () => {
    setShowTransactions( 10);
   };

    const [currentComponent, setCurrentComponent] = useState(0);
    const [send, SetSend] = useState(false)


  const transactions = [
    {status : "realizada" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "kuewhfbroc7843q"},
    {status : "pendiente" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : "wqeyui2b1982"},
    {status : "realizada" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "uy2txev3162"},
    {status : "realizada" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "9liunenf3ghp8"},
    {status : "realizada" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "o18i2u3emp893"},
    {status : "realizada" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : "89e8nrct43r9"},
    {status : "pendiente" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : "oinds782863e"},
    {status : "pendiente" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "mx9p82uy338uyr8"},
    {status : "pendiente" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "iuye08x723b"},
    {status : "pendiente" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "oekixmi[0923m8m"},
    {status : "pendiente" ,detail: "Regalo" , type: "gasto" , amount: 100000, ts: "10 de Enero" , id : "po931iuem"},
    {status : "realizada" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : ";powmqde[82903"},
    {status : "realizada" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : "iuqytbe872"},
    {status : "realizada" ,detail: "Regalo" , type: "ganancia" , amount: 100000, ts: "10 de Enero" , id : "iuqytbe872"}
  ]


    return (
        user !== null ?<div className={style.cont} >
          <div className={style.content}>
            <div className={style.operations}>
              <div className={style.total}>
                <span>400 OSP</span>
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
              </div>
            </div>

            <div className={style.header}>
              <div className={style.line}></div>
              <h3>Transacciones</h3> 
            </div>

            <div className={style.options}>
              <button><SiMicrosoftexcel/></button>
              <div className={style.transactions}>
              <div className={style.slider}>
                <div className={style.header1}>
                    <span onClick={() => setCurrentComponent(0)}
                        className = {currentComponent === 0 ? `${style.active}`: `${style.inActive}`}
                    >Transacciones Completadas </span>
                    <span onClick={() => setCurrentComponent(1)}
                        className = {currentComponent === 1 ? `${style.active}`: `${style.inActive}`}
                    >Pendientes </span>
                    <span onClick={() => setCurrentComponent(2)}
                        className = {currentComponent === 2 ? `${style.active}`: `${style.inActive}`}
                    >Enviado </span>
                    <span onClick={() => setCurrentComponent(3)}
                        className = {currentComponent === 3 ? `${style.active}`: `${style.inActive}`}
                    >Recibido</span>
                    {/*<span className={style.inActive}>Exportar .xls</span>*/}
                </div>
                <div className={style.transactionBx}>
                {currentComponent === 0 && transactions.slice(0, showTransactions).filter(transaction => transaction.status === "realizada").map(transaction => (
                 <Transaction key={transaction.id} {...transaction} />
                ))}
                {currentComponent === 1 && transactions.slice(0, showTransactions).filter(transaction => transaction.status === "pendiente").map(transaction => (
                 <Transaction key={transaction.id} {...transaction} />
                ))}

                {currentComponent === 2 && transactions.slice(0, showTransactions).filter(transaction => transaction.type === "gasto").map(transaction => (
                 <Transaction key={transaction.id} {...transaction} />
                ))}
                {currentComponent === 3 && transactions.slice(0, showTransactions).filter(transaction => transaction.type === "ganancia").map(transaction => (
                 <Transaction key={transaction.id} {...transaction} />
                ))}

                </div>
                
            </div>

              </div>
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
  