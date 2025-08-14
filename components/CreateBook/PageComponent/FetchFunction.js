import { textCapitalize } from "./Function.js";
import { spinner } from "../../../js/script.js";
import { showToast } from "../../../js/script.js";
import { CreateBookItem, AppState } from "../../../states/BookStates.js";
import { api_name_server } from "../../../config.js";
import { ModalHide } from "../../modal.js";

export const getCategory = async () => {
    spinner(true);
    try{
        const response = await fetch(`${api_name_server}get_categories.php`,
            {
                method: "Get",
                credentials: "include"
            }
        );
        const data = await response.json();
        if(data.success){
            const select = document.getElementById("category_select");
            data.data.forEach(element => {
                const div = document.createElement("div");
                div.innerHTML = `<option value="${element.id}">${element.category}</option>`
                select.appendChild(div.firstElementChild)
            });
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
    }
    finally{
        spinner(false);
        return ""
    }
}

export const modalCreateCategory = async () => {
    const category_val = document.getElementById("modal_category").value;
    if(category_val.trim() === ""){
        showToast( "Geçerli Bir Kategori Girin","danger")
    }
    const formData = new FormData()
    formData.append("category",category_val)
    spinner(true);
    try{
        const response = await fetch(`${api_name_server}create_category.php`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            }
        );
        const data = await response.json();
        if(data.success){
            const select = document.getElementById("category_select");
        
            const div = document.createElement("div");
            div.innerHTML = `<option value="${data.data.id}">${data.data.category}</option>`
            select.appendChild(div.firstElementChild)
            
            ModalHide("CreateCategoryModal")
            showToast("Yeni Kategori Oluşturuldu","success")
        }
        else{
            showToast( data.message,"danger")
        }
    }catch (error) {
        console.error("addBookDB hatası:", error);
    }
    finally{
        spinner(false);
        return ""
    }
}

export const addBookDB = async () => {
    const formData = new FormData()
    formData.append("isbn", CreateBookItem.book.isbn);
    formData.append("title", CreateBookItem.book.title);
    formData.append("author", CreateBookItem.book.author);
    formData.append("subtitle", CreateBookItem.book.subtitle);
    formData.append("publisher", CreateBookItem.book.publisher);
    formData.append("publish_date", CreateBookItem.book.publish_date);
    formData.append("number_of_pages", CreateBookItem.book.number_of_pages);
    if (Array.isArray(CreateBookItem.book.category)) {
        CreateBookItem.book.category.forEach(catId => {
            formData.append("categories[]", catId);
        });
    } else if (CreateBookItem.book.category) {
        // Tekil bir değer varsa direkt ekle
        formData.append("categories[]", CreateBookItem.book.category);
    }
    try{
        const response = await fetch(`${api_name_server}book_create.php`,
            {
                method: "POST",
                body: formData,
                credentials: "include"
            }
        );
        const data = await response.json();
        if(data.success && AppState.fetchBook){
            AppState.Books.push(CreateBookItem.book)
        }
        showToast(response.status+": "+data.message,data.success ? "success" : "danger" )
        
    }catch (error) {
        console.error("addBookDB hatası:", error);

    }
}

export const fetchGoogleAPI = async (isbn) => {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const book = data.items[0].volumeInfo;
            CreateBookItem.book.title = book.title ? textCapitalize(book.title) : "";
            CreateBookItem.book.subtitle = book.subtitle ? textCapitalize(book.subtitle) : "";
            CreateBookItem.book.author = book.authors ? textCapitalize(book.authors.join(", ")) : "";
            CreateBookItem.book.publish_date =  book.publishedDate || "";
            CreateBookItem.book.number_of_pages = book.pageCount || null;

            return true; // başarılı
        } else {
            return false; // kitap bulunamadı
        }
    } catch (error) {
        console.error("Google API hatası:", error);
        return false; // hata oldu
    }
}

export const fetchOpenLibrary = async (isbn) => {
    try {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
        const data = await response.json();
        const book = data[`ISBN:${isbn}`];
        if (!book) return;

        if (!CreateBookItem.book.title) CreateBookItem.book.title = book.title ? textCapitalize(book.title) : "";
        if (!CreateBookItem.book.subtitle) CreateBookItem.book.subtitle = book.subtitle ? textCapitalize(book.subtitle) : "";
        if (!CreateBookItem.book.author && book.authors) CreateBookItem.book.author = book.authors ? textCapitalize(book.authors[0]?.name) : "";
        if (!CreateBookItem.book.publisher && book.publishers) CreateBookItem.book.publisher = book.publishers ? textCapitalize(book.publishers[0]?.name) : "";
        if (!CreateBookItem.book.publish_date) CreateBookItem.book.publish_date = book.publish_date || "";
        if (CreateBookItem.book.number_of_pages === null) CreateBookItem.book.number_of_pages = book.number_of_pages || null;

    } catch (error) {
        console.error("OpenLibrary hatası:", error);
    }
}
