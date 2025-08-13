import { spinner } from "../../../js/script.js";
import { AppState } from "../../../states/BookStates.js";
import { api_name_server } from "../../../config.js";

export const getCategory = async () => {
    try{
        spinner(true);
        const response = await fetch(`${api_name_server}get_categories.php`,
            {
                method: "GET",
                credentials: "include" // ⚠ cookie gönderimi için
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
        AppState.fetchBook = true;
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
                publisher: book.publisher === null ? "" : book.publisher
            }));
            const booksWithImages = await Promise.all(data.data.map(async (book) => {
                book.img_src = await renderImg(book.isbn);
                return book;
            }));
            AppState.Books = booksWithImages;
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
    }
}

async function renderImg(isbn) {
    try {
        const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
        if (!response.ok) return ""; // Resim yoksa boş döner
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch {
        return ""; // Hata varsa boş döner
    }
}