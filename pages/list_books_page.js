import { renderPage } from "../components/ListBook/list_book.js"
import { loginCheck, changePage } from "../js/script.js"

export const ListBooksPage = async () => {
    const isLogin = await loginCheck()
    if(isLogin)
        renderPage()
    else{
        changePage("login")
    }
}