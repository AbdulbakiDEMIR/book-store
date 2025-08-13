import { BookItem, UpdateItem} from "./BookItemComponent.js";
import { AppState } from "../../../states/BookStates.js";
import { Modal, OpenModal } from "../../modal.js";
import { deleteCategory } from "./BookItemComponent.js";
import { closePopover } from "./BookItemComponent.js";
import { showToast } from "../../../js/script.js";
import { updateBookFetch } from "./FetchFunction.js";

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
const showSelectedCategory = function() {
    const select = document.getElementById("category_select");
    const selectedOption = select.options[select.selectedIndex];
    const selectedText = selectedOption.text;
    const selectedValue = selectedOption.value;
    if(isNaN(selectedValue)){
        showToast("Kategori Seç","danger")
        return
    }
    if(selectedValue === "-1"){
        OpenModal('CreateCategoryModal')
        return
    }
    const alreadyExists = UpdateItem.book.category.some(cat => String(cat) === String(selectedValue));
    if(alreadyExists){
        showToast("Seçilmemiş Bir Kategori Seç","danger");
        return
    }
    UpdateItem.book.category.push(Number(selectedValue));
    addCategory({category:selectedText, id:selectedValue})
}

const UpdateBook = async () => {
    UpdateItem.book.title = document.getElementById("modal_title").value;
    UpdateItem.book.subtitle = document.getElementById("modal_subtitle").value;
    UpdateItem.book.author = document.getElementById("modal_author").value;
    UpdateItem.book.publisher = document.getElementById("modal_publisher").value;
    UpdateItem.book.publish_date = document.getElementById("modal_published_date").value;
    UpdateItem.book.number_of_pages = document.getElementById("modal_page_count").value;
    const updated = await updateBookFetch()
    if(updated){
        const updated_book =  document.getElementById(`book_${UpdateItem.book.isbn}`)
        updated_book.innerHTML = ``
        const div = document.createElement("div");
        div.innerHTML = BookItem(UpdateItem.book);
        updated_book.appendChild(div.firstElementChild.firstElementChild);
        
        const index = AppState.Books.findIndex(book => book.isbn === UpdateItem.book.isbn);
        if (index !== -1) {
            AppState.Books[index] = { ...UpdateItem.book };
        }
    }
    
}


export const UpdateModal = () => {
    let categoriesSelect = "";
    AppState.Categories.forEach(element => {
        categoriesSelect += `<option value="${element.id}">${element.category}</option>`
    });
    const update_content = `
        <form onSubmit="event.preventDefault();" class="d-flex flex-column gap-2">
            <div class="d-flex w-100 ">
                <span class="col-4 fw-bold">ISBN</span>
                <span  type="text" id="modal_isbn"> </span>
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
            <div class="row">
                <h6 class="col-4 mt-2 fw-bold">Kategoriler</h6>
                <div class="col-8 row d-flex gap-2 ">
                    <div class="d-flex w-100 gap-2 pe-0">
                        <select class="form-select" id="category_select">
                            <option selected>Kategori Seç</option>
                            <option value="-1">Yeni Kategori Ekle</option>
                            ${categoriesSelect}
                        </select>
                        <button id="modalShowSelectCategory" class="btn btn-primary">Ekle</button>
                    </div>
                    <div id="category_items"class="col-12 py-2 d-flex gap-2 flex-wrap">
                    </div>    
                </div>
            </div>
        </form>
    `

    
    return`
        ${Modal({
            content:{
                title:"Güncelle",
                body:update_content
            },
            id:"BookEditModal",
            btn1:{
                class:"btn btn-primary",
                content:"İptal"
            },
            btn2:{
                class:"btn btn-success",
                content:"Güncelle"
            }
        })}
    `
}

export const UpdateModalEventLoader = () => {
    document.getElementById("BookEditModalBtn1").addEventListener("click", ()=>{closePopover()})
    document.getElementById("BookEditModalBtn2").addEventListener("click", ()=>{UpdateBook()})
    document.getElementById("modalShowSelectCategory").addEventListener("click", ()=>{showSelectedCategory()})
}