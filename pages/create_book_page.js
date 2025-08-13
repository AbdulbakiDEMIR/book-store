import { renderPage } from "../components/CreateBook/create_book.js"
import { loginCheck, changePage } from "../js/script.js"

export const CreateBooksPage = async () => {
    const isLogin = await loginCheck()
    if(isLogin)
        renderPage()
    else{
        changePage("login")
    }
}