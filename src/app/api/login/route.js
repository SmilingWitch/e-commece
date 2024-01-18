import axios from "axios";
import {serialize} from "cookie"

export default async function  login(req, res) {
    let resp
    try{
        resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`,req.body)
        const login = resp
        const serializedAccess = serialize('access',login.data.access,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path:'/'
        })
        const serializedRefresh = serialize('refresh',login.data.refresh,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path:'/'
        })
        res.setHeader('Set-Cookie',[serializedAccess,serializedRefresh])
        res.status(200).json({status:login.status,data:login.data})
    }catch(error){
        resp= error.response
        res.status(400).json({status:resp.status,data:resp.data})
    }
    
    // res.status(200).json({login:true})
}