import { renderPage } from "../components/EditBook/edit_book.js";
import { loginCheck, changePage } from "../js/script.js"

export const EditBooksPage = async () => {
    const isLogin = await loginCheck()
    if(isLogin)
        renderPage()
    else{
        changePage("login")
    }
}