import style from "../../public/assets/styles/Dialog.module.css"


export default function Dialog({header, content,SetActive,fnc}){
    return(
        <div className={style.cont} onClick = {(event) => {event.stopPropagation()}}>
            <div className={style.bx}>
                <div className={style.header}>
                    {header}
                </div>
                <div className={style.content}>
                    {content}
                </div>
                <div className={style.btnBx}>
                    <button onClick = {fnc}>Aceptar</button>
                    <button onClick = {() => SetActive(false)}>Cancelar</button>
                </div>

            </div>
            
        </div>
    )
}