import style from "../../public/assets/styles/ErrorDialog.module.css"

export default function ErrorDialog({error}){

    return(
        error && <div className={style.error}>{error}</div>
    )
 }
 