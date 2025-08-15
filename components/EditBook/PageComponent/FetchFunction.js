import { spinner } from "../../../js/script.js";
import { AppState } from "../../../states/BookStates.js";
import { showToast } from "../../../js/script.js";
import { UpdateItem } from "./BookItemComponent.js";
import { api_name_server } from "../../../config.js";

export const getCategory = async () => {
    try{
        spinner(true);
        const response = await fetch(`${api_name_server}get_categories.php`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        const data = await response.json();
        if(data.success){
            AppState.Categories = data.data;
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
    }
}


export const getBooks = async () => {
    try{
        spinner(true);
        const response = await fetch(`${api_name_server}book_get.php`,
            {
                method: "GET",
                credentials: "include"
            }
        );
        const data = await response.json();
        if(data.success){
            data.data = data.data.map(book => ({
                ...book,
                publisher: book.publisher === null ? "" : book.publisher,
                img_src: ""
            }));
            
            AppState.Books = data.data
            
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
    }
}
export const deleteBookFetch = async (isbn) => {
    try{
        const response = await fetch(`${api_name_server}book_delete.php`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ isbn }),
                credentials: "include"
            }
        )
        const data = await response.json();
        if(data.success){
            showToast(data.message, "success")
            return true;
        }
        else{
            showToast(data.message, "danger")
            return false
        }
    }
    catch{
        showToast("Kitap Silinemedi", "danger");
        return false
    }
}
export const updateBookFetch = async () => {
    try{
        const response = await fetch(`${api_name_server}book_update.php`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UpdateItem.book),
                credentials: "include"
            }
        )
        const data = await response.json();
        if(data.success){
            showToast(data.message, "success")
            return true;
        }
        else{
            showToast(data.message, "danger")
            return false
        }
    }
    catch{
        showToast("Kitap Güncellenemedi", "danger");
        return false
    }
}
export async function renderImg(isbn) {
    try {
        const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
        if (!response.ok) return ""; // Resim yoksa boş döner
        const blob = await response.blob();
        const book_img = document.querySelector(`#book_${isbn} img`)
        if(blob.size < 100){
            if(book_img) book_img.src = `${api_name_server}book_placeholder.jpg`
            return `${api_name_server}book_placeholder.jpg`
        }
        
        if(book_img) book_img.src = URL.createObjectURL(blob);
        return URL.createObjectURL(blob);
    } catch {
        return ""; // Hata varsa boş döner
    }
}