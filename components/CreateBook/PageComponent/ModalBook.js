import { renderBook } from "./Function.js";
import { Modal, ModalHide } from "../../modal.js";
import { CreateBookItem } from "../../../states/BookStates.js";

export const modalBookLoad = () => {
    document.getElementById("modal_isbn").value = CreateBookItem.book.isbn;
    document.getElementById("modal_title").value = CreateBookItem.book.title;
    document.getElementById("modal_subtitle").value = CreateBookItem.book.subtitle;
    document.getElementById("modal_author").value = CreateBookItem.book.author;
    document.getElementById("modal_publisher").value = CreateBookItem.book.publisher;
    document.getElementById("modal_published_date").value = CreateBookItem.book.publish_date;
    document.getElementById("modal_page_count").value = CreateBookItem.book.number_of_pages;
}
const modalBookCancel = () => {
    document.getElementById("modal_isbn").value = "";
    document.getElementById("modal_title").value = "";
    document.getElementById("modal_subtitle").value = "";
    document.getElementById("modal_author").value = "";
    document.getElementById("modal_publisher").value = "";
    document.getElementById("modal_page_count").value = null;
}
const modalBookSaveChanges = () => {
    const isbn = document.getElementById("modal_isbn").value;
    const title = document.getElementById("modal_title").value;
    const subtitle = document.getElementById("modal_subtitle").value;
    const author = document.getElementById("modal_author").value;
    const publisher = document.getElementById("modal_publisher").value;
    const publishedDate = document.getElementById("modal_published_date").value;
    const pageCount = document.getElementById("modal_page_count").value;
    CreateBookItem.book = {
        isbn: isbn,
        title: title,
        subtitle: subtitle,
        author: author,
        publisher: publisher,
        publish_date: publishedDate,
        number_of_pages: pageCount,
        category: CreateBookItem.book.category
    }
    ModalHide("ManualCreateModal");
    renderBook();
}

export const ModalBook = () => {
    const modalBookContent = `
        <form onSubmit="event.preventDefault();" class="d-flex flex-column gap-2">
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">ISBN</span>
                <input class="form-control " type="text" id="modal_isbn" placeholder="ISBN"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Başlık</span>
                <input class="form-control " type="text" id="modal_title" placeholder="Başlık"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Alt Başlık</span>
                <input class="form-control " type="text" id="modal_subtitle" placeholder="Alt Başlık"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Yazar</span>
                <input class="form-control " type="text" id="modal_author" placeholder="Yazar"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Yayıncı</span>
                <input class="form-control " type="text" id="modal_publisher" placeholder="Yayıncı"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Yayın Tarihi</span>
                <input class="form-control " type="text" id="modal_published_date" placeholder="Yayın Tarihi"/>
            </div>
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Sayfa Sayısı</span>
                <input class="form-control " type="text" id="modal_page_count" placeholder="Sayfa Sayısı"/>
            </div>
        </form>
    `
    return`
        ${Modal({
            content: {
                title: "Kaydet",
                body: modalBookContent,
            }, 
            btn1: {
                class: "btn btn-primary",
                content: "İptal"
            },
            btn2: {
                class: "btn btn-success",
                content: "Değişiklikleri Kaydet"
            },
            id:"ManualCreateModal"
        })}
    `
}

export const ModalBookEventLoader = () => {
    document.getElementById("ManualCreateModalBtn1").addEventListener("click", ()=>{modalBookCancel()})
    document.getElementById("ManualCreateModalBtn2").addEventListener("click", ()=>{modalBookSaveChanges()})
}