import { spinner, watchMediaQueries } from "../../js/script.js";
import { BookItem, BookItemEventLoader} from "./PageComponent/BookItemComponent.js";
import { SideBar, SideBarEventLoader } from "./PageComponent/SideBarComponent.js";
import { filterBook } from "./PageComponent/FilterFunction.js";
import { getCategory, getBooks } from "./PageComponent/FetchFunction.js";
import { AppState } from "../../states/BookStates.js";
import { Modal, ModalHide } from "../modal.js";
import { ToastMessage } from "../toast_message.js";
import { UpdateModal, UpdateModalEventLoader } from "./PageComponent/UpdateModal.js";
import { showToast } from "../../js/script.js";
import { api_name_server } from "../../../config.js";
import { NavBar, NavBarEventLoader } from "../NavBar.js";

// HTML event’leri için global fonksiyonlar

const modalCategoryCancel = () => {
    document.getElementById("modal_category").value = "";
}
const modalCreateCategory = async () => {
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
                body: formData
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
            document.getElementById("modal_category").value = ""
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

export const EditBooks = async () => {
    spinner(true);
    AppState.Filters = { Search: "" }
    
    try {
        await getCategory();
        if (!AppState.fetchBook)
            await getBooks();
        
        const book_items_array = AppState.Books.map(book => BookItem(book));
        const book_items = book_items_array.join('');

        watchMediaQueries({
            '(min-width: 768px)': () => {
                const canvasClose = document.querySelector("#SideBar > div.offcanvas-header > button");
                if(canvasClose) canvasClose.click();
                const sideBar = document.getElementById("side-bar");
                const canvasSideBar = document.getElementById("canvasSideBar");
                if (sideBar && canvasSideBar) {
                    sideBar.innerHTML = ``;
                    while (canvasSideBar.firstChild) {
                        sideBar.appendChild(canvasSideBar.firstChild);
                    }
                    canvasSideBar.innerHTML = ``;
                }
            },
            '(max-width: 768px)': () => {
                const sideBar = document.getElementById("side-bar");
                const canvasSideBar = document.getElementById("canvasSideBar");
                if (sideBar && canvasSideBar) {
                    canvasSideBar.innerHTML = ``;
                    while (sideBar.firstChild) {
                        canvasSideBar.appendChild(sideBar.firstChild);
                    }
                    sideBar.innerHTML = ``;
                }
            },
        });
        
        const modalCategoryContent = `
            <form onSubmit="event.preventDefault();">
                <div class="d-flex w-100 ">
                    <span class="col-4 fw-bold">Kategori</span>
                    <input class="form-control " type="text" id="modal_category" placeholder="Kategori"/>
                </div>
            </form>
        `
        return `
            ${NavBar()}
            <div class="container">
                <div class="d-flex position-relative">
                    <div id="side-bar">
                        ${window.innerWidth > 768 ? SideBar(): ""}
                    </div>
                    <div id="books-container" class="mt-3">
                        <div class="d-flex gap-2">
                            <input class="form-control" type="text" placeholder="Ara" id="searchInput"/>
                            <div class="px-2">
                                
                                <div class="d-flex gap-2 flex-row flex-nowrap">
                                    <input class="form-check-input" type="radio" name="sort_book" id="ascBtn" checked />
                                    <label class="text-nowrap" for="ascBtn">A-Z</label>
                                </div>  
                                <div class="d-flex gap-2 flex-row flex-nowrap">
                                    <input class="form-check-input" type="radio" name="sort_book" id="descBtn"/>
                                    <label class="text-nowrap" for="descBtn">Z-A</label>
                                </div>
                            </div>
                        </div>
                        <div id="Books" class="row row-cols-2 row-cols-sm-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6">
                            ${book_items}
                        </div>
                    </div>
                </div>
            </div>
            <span class="canvas-none bg-danger text-white px-3 py-2 position-fixed top-0 left-0" style="transform: rotate(90deg) translate(50%, 50%);" data-bs-toggle="offcanvas" href="#SideBar" role="button" aria-controls="SideBar">
                Filtre
            </span>
            <div class="canvas-none offcanvas offcanvas-start" tabindex="-1" id="SideBar" aria-labelledby="SideBarLabel" style="width:250px">
                <div class="offcanvas-header">
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div id="canvasSideBar" class="offcanvas-body">
                    ${window.innerWidth <= 768 ? SideBar(): ""}
                </div>
            </div>

            ${ToastMessage()}
            ${UpdateModal()}
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
        `;
    } catch (error) {
        console.error(error);
        return `<p>Kitaplar yüklenirken hata oluştu.</p>`;
    } finally {
        spinner(false);
    }
}

export async function renderPage() {
    const container = document.getElementById("app");
    container.innerHTML = await EditBooks();

    document.getElementById("searchInput").addEventListener("keyup", (event) => {
        if(event.target.value.trim() != AppState.Filters.Search){
            AppState.Filters.Search = event.target.value;
            filterBook();
        }
    });
    document.getElementById("ascBtn").addEventListener("click", () => {
        AppState.Books.sort((a, b) => a.title.localeCompare(b.title));
        filterBook();
    });

    document.getElementById("descBtn").addEventListener("click", (event) => {
        AppState.Books.sort((a, b) => b.title.localeCompare(a.title));
        filterBook();
    });
    document.getElementById("CreateCategoryModalBtn1").addEventListener("click", ()=>{modalCategoryCancel()})
    document.getElementById("CreateCategoryModalBtn2").addEventListener("click", ()=>{modalCreateCategory()})
    SideBarEventLoader()
    BookItemEventLoader()
    UpdateModalEventLoader()
    NavBarEventLoader()
}