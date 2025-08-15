import { spinner } from "../../../js/script.js";
import { AppState } from "../../../states/BookStates.js";
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
            
            AppState.Books = data.data;
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
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