import { spinner } from "../../js/script.js";
import { Modal, ModalButton } from "../modal.js";
import { ToastMessage } from "../toast_message.js";
import { getCategory, modalCreateCategory, addBookDB } from "./PageComponent/FetchFunction.js";
import { ModalBook, ModalBookEventLoader, modalBookLoad } from "./PageComponent/ModalBook.js";
import { showSelectedCategory, searchBook, modalCategoryCancel } from "./PageComponent/Function.js";
import { NavBar, NavBarEventLoader } from "../NavBar.js";
export const CreateBook = async () => {
    getCategory()
    const modalCategoryContent = `
        <form onSubmit="event.preventDefault();">
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">Kategori</span>
                <input class="form-control " type="text" id="modal_category" placeholder="Kategori"/>
            </div>
        </form>
    `
    return`
        ${NavBar()}
        <section id="page1" >
            <div class="container">
                <form onsubmit="event.preventDefault();" class="row flex-column mt-5">
                    <div class="col-md-6 mx-auto  mb-4">
                        <h3 class="fw-bolder" for="isbn">ISBN</h3>
                        <div class="d-flex gap-2">
                            <input class="form-control" type="text" id="isbn" placeholder="ISBN">
                            <button id="searchBookButton" class="btn btn-primary d-flex align-items-center gap-2 fs-6 fw-bolder">
                                <i class="fa-solid fa-magnifying-glass"></i>
                                Bul
                            </button>
                        </div>
                    </div>
                </form>
                <div class="row">
                    <div id="result" class="col-md-6 mx-auto">
                        <div class="row">
                            <h6 class="col-4 info-header">ISBN</h6>
                            <h6 id="result_isbn" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Başlık</h6>
                            <h6 id="result_title" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Alt Başlık</h6>
                            <h6 id="result_sub_title" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Yazar</h6>
                            <h6 id="result_author" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Yayıncı</h6>
                            <h6 id="result_publisher" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Yayın Tarihi</h6>
                            <h6 id="result_published_date" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 info-header">Sayfa Sayısı</h6>
                            <h6 id="result_page_count" class="col-8"></h6>
                        </div>
                        <div class="row">
                            <h6 class="col-4 mt-2 info-header">Kategoriler</h6>
                            <div class="col-8 row d-flex gap-2 ">
                                <div class="d-flex w-100 gap-2 pe-0">
                                    <select class="form-select" id="category_select">
                                        <option selected>Kategori Seç</option>
                                        <option value="-1">Yeni Kategori Ekle</option>
                                    </select>
                                    <button id="showSelectedCategoryBtn" class="btn btn-primary">Ekle</button>
                                </div>
                                <div id="category_items"class="col-12 py-2 d-flex gap-2 flex-wrap">
                                </div>    
                            </div>
                        </div>
                        <div id="addButtonComponent" class="w-100 d-flex gap-2 my-4">
                            <button class="btn btn-success ms-auto btn1">Ekle</button>
                            ${ModalButton("Elle Ekle", "ManualCreateModal", "btn btn-warning btn2")}
                        </div>
                        <div class="row">
                            <img class="col-9 col-md-6 mx-auto" id="result_img"/>
                        </div>
                       
                    </div>
                </div>
            </div>
        </section>   
        ${ToastMessage()} 
        ${ModalBook()}
        ${Modal({
            content: {
                title: "Kaydet",
                body: modalCategoryContent,
            }, 
            btn1: {
                class: "btn btn-primary",
                content: "İptal",
            },
            btn2: {
                class: "btn btn-success",
                content: "Yeni Kategori",
            },
            id:"CreateCategoryModal"
        })}
    `
}


export async function renderPage() {
    const container = document.getElementById("app");
    container.innerHTML = await CreateBook();

    spinner(false)

    document.getElementById("searchBookButton").addEventListener("click", ()=>{searchBook()})
    const addButtonComponent = document.getElementById("addButtonComponent");
    addButtonComponent.querySelector(".btn1").addEventListener("click",()=>{addBookDB()})
    addButtonComponent.querySelector(".btn2").addEventListener("click",()=>{modalBookLoad()})
    document.getElementById("showSelectedCategoryBtn").addEventListener("click", ()=>{showSelectedCategory()})
    document.getElementById("CreateCategoryModalBtn1").addEventListener("click", ()=>{modalCategoryCancel()})
    document.getElementById("CreateCategoryModalBtn2").addEventListener("click", ()=>{modalCreateCategory()})
    ModalBookEventLoader()
    NavBarEventLoader()
}