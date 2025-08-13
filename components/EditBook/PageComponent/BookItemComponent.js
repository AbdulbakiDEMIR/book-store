import { ModalButton } from "../../modal.js";
import { spinner } from "../../../js/script.js";
import { deleteBookFetch } from "./FetchFunction.js";
import { AppState } from "../../../states/BookStates.js";
import { CategoryItem } from "./CategoryItemComponent.js";

export const UpdateItem = {
    book:{}
}

export const deleteCategory = (id) => {
    const isbn = document.getElementById("modal_isbn").innerHTML;
    let book = AppState.Books.find(book => book.isbn == isbn) 
    UpdateItem.book.category = book.category.filter(cat => cat != id);
    document.getElementById(`update_category_${id}`).remove();
}
export const closePopover = () => {
    const openPopovers = document.querySelectorAll(".book-edit-popover[show='true']");
    openPopovers.forEach(popover => {
        popover.setAttribute("show", "false");
    });
    const openPopoverBg = document.querySelectorAll(".popover-bg");
    openPopoverBg.forEach(popover => {
        popover.remove();
    });
} 
export const openPopover = (event) => {
    closePopover()
    const isbn = event.target.getAttribute("isbn");
    const popover_content = document.getElementById(`book_edit_popover_${isbn}`);
    popover_content.setAttribute("show","true");
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="popover-bg">
        </div>
    `
    div.firstElementChild.addEventListener("click",()=>{
        closePopover()
    })
    document.getElementById("app").appendChild(div.firstElementChild);
}
export const deleteBook = async (event) => {
    spinner(true)
    const isbn = event.currentTarget.getAttribute("isbn");
    const deleted = await deleteBookFetch(isbn)
    if(deleted){
        document.getElementById(`book_${isbn}`).remove();
        AppState.Books = AppState.Books.filter(book => book.isbn != isbn)
        closePopover()
    }
    spinner(false)
}
const addCategory = (category) => {
    const category_items = document.getElementById("category_items");
    const div = document.createElement("div");
    const category_item = `
        <div id="update_category_${category.id}"class="badge rounded-pill bg-danger fw-normal shadow" style="--bs-bg-opacity:0.8">
            <div class="d-flex gap-2 align-items-center justify-items-center">
                <span>${category.category}</span>
                <i class="fa-solid fa-x" style="font-size:10px; cursor:pointer;"></i>
            </div>
        </div>
    `
    div.innerHTML = category_item;
    div.querySelector("i").addEventListener("click", () => {
        deleteCategory(category.id);
    });
    category_items.appendChild(div.firstElementChild);
}
export const openUpdateModal = (isbn) => {
    const book = JSON.parse(JSON.stringify(AppState.Books.find(item => item.isbn == isbn)));
    UpdateItem.book = book;  
    document.getElementById("modal_isbn").innerHTML = book.isbn;
    document.getElementById("modal_title").value = book.title;
    document.getElementById("modal_subtitle").value = book.subtitle;
    document.getElementById("modal_author").value = book.author;
    document.getElementById("modal_publisher").value = book.publisher;
    document.getElementById("modal_published_date").value = book.publish_date;
    document.getElementById("modal_page_count").value = book.number_of_pages;
    document.getElementById("category_items").innerHTML = ``;
    UpdateItem.book.category.forEach(cat => {
        const category = AppState.Categories.find(item => item.id === cat);
        addCategory(category);
    });
}

export const BookItem = (book_item) => {
    let book_item_categories = ``
    book_item.category.forEach(element => {
        book_item_categories += CategoryItem(element)
    })

    const modal_body = `<div class="d-flex gap-2 align-items-center text-success"><i class="fa-solid fa-pen"></i><span>Düzenle</span></div>`
    
    return`
        <div id="book_${book_item.isbn}" class="col p-2">
            <div class="w-100 text-center position-relative">
                <div class="d-flex align-items-center justify-content-center position-absolute top-0 end-0 rounded-circle m-2" style="width:20px; height:20px; cursor:pointer; background: #fffa; ">
                    <i class="open-popover-button fa-solid fa-ellipsis" isbn="${book_item.isbn}" ></i>
                    <div class="position-absolute">
                        <div id="book_edit_popover_${book_item.isbn}" class="book-edit-popover" show="false">
                            <div class="book-edit-popover-container" isbn="${book_item.isbn}">
                                ${ModalButton(
                                    modal_body,
                                    "BookEditModal",
                                    "bg-transparent",
                                )}
                                
                                <hr class="my-1"/>
                                <div class="popover-delete-button d-flex gap-2 align-items-center text-danger"  isbn="${book_item.isbn}">
                                    <i class="fa-solid fa-trash"></i>
                                    <span>Sil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-100 bg-dark">
                    <img src="${book_item.img_src || 'https://via.placeholder.com/200x300?text=No+Image'}" class="book-img"/>
                </div>
                <div class="w-100 d-flex flex-column mt-2" >
                    ${book_item.title ? `<h5 class="fw-bold m-0">${book_item.title}</h5>` : ''}
                    ${book_item.subtitle ? `<h6>${book_item.subtitle}</h6>` : ''}
                    ${book_item.author ? `<h6 class="fw-bolder">${book_item.author}</h6>` : ''}
                    ${book_item.publisher ? `<h6>${book_item.publisher}</h6>` : ''}
                    ${book_item.isbn ? `<h6>${book_item.isbn}</h6>` : ''}
                    ${book_item.publish_date ? `<h6>${book_item.publish_date}</h6>` : ''}
                    ${book_item.number_of_pages ? `<h6>Sayfa: ${book_item.number_of_pages}</h6>` : ''}
                    ${book_item_categories ? `<div id="categories_${book_item.isbn}">${book_item_categories}</div>` : ''}
                </div>
            </div>
        </div>   
    `
}


export const BookItemEventLoader = () => {
    document.querySelectorAll(".open-popover-button").forEach(element => {
        element.addEventListener("click", (event)=>{openPopover(event)})
    })
    document.querySelectorAll(".popover-delete-button").forEach(element => {
        element.addEventListener("click", (event)=>{deleteBook(event)})
    })
    document.querySelectorAll(".book-edit-popover-container").forEach(element=>{
        const isbn = element.getAttribute("isbn");
        element.querySelector("button").addEventListener("click", ()=>{openUpdateModal(isbn)} )
    })
}