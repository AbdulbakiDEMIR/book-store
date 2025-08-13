import { renderPage } from "../components/Login/Login.js"
import { loginCheck, changePage } from "../js/script.js"


export const LoginPage = async () => {
    const isLogin = await loginCheck()
    if(!isLogin)
        renderPage()
    else{
        changePage("")
    }
}