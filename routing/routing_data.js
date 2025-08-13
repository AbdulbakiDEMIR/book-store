import { ListBooksPage } from "../pages/list_books_page.js";
import { EditBooksPage } from "../pages/edit_books_page.js";
import { CreateBooksPage } from "../pages/create_book_page.js";
import { LoginPage } from "../pages/login_page.js";

export const routing_data = [
    
    {
        path: "",
        page: () => ListBooksPage()
    },
    {
        path:"create",
        page: () => CreateBooksPage()
    },
    {
        path: "edit",
        page: () => EditBooksPage()
    },
    {
        path: "login",
        page: () => LoginPage()
    }
]