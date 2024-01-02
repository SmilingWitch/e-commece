import style from "../../public/assets/styles/Dialog.module.css"
import BeatLoader from "react-spinners/BeatLoader"

export default function Dialog({header, content,SetActive,fnc, loading, setLoading}){
    return(
        <div className={style.cont} onClick = {(event) => {event.stopPropagation()}}>
            <div className={style.bx}>
                <div className={style.header}>
                    {header}
                </div>
                <div className={style.content}>
                    {content}
                </div>
                {loading === false ? <div className={style.btnBx}>
                    <button onClick = {fnc}>Aceptar</button>
                    <button onClick = {() => SetActive(false)}>Cancelar</button>
                </div>: <div className={style.centerLoader}>
                    <div className="sweet-loading">
                          <BeatLoader
                            color="rgba(255, 68, 0,1)"
                            cssOverride={{}}
                            margin={10}
                            size={10}
                            speedMultiplier={1}
                          />
                        </div>
                </div>
                }

            </div>
            
        </div>
    )
}