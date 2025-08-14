import { CreateBookItem } from "../../../states/BookStates.js";
import { showToast } from "../../../js/script.js";
import { OpenModal } from "../../modal.js";
import { fetchOpenLibrary, fetchGoogleAPI } from "./FetchFunction.js";
import { spinner } from "../../../js/script.js";




export const modalCategoryCancel = () => {
    document.getElementById("modal_category").value = "";
}

export const showSelectedCategory = function() {
    const select = document.getElementById("category_select");
    const selectedOption = select.options[select.selectedIndex];
    const selectedText = selectedOption.text;
    const selectedValue = selectedOption.value;
    if(isNaN(selectedValue)){
        showToast("Kategori Seç","danger")
        return
    }
    if(selectedValue === "-1"){
        OpenModal("CreateCategoryModal")
        return
    }
    const alreadyExists = CreateBookItem.book.category.some(cat => String(cat) === String(selectedValue));
    if(alreadyExists){
        showToast("Seçilmemiş Bir Kategori Seç","danger");
        return
    }
    addCategory({category:selectedText, id:selectedValue})
}

const addCategory = (category) => {
    CreateBookItem.book.category.push(Number(category.id));
    const category_items = document.getElementById("category_items");
    const div = document.createElement("div");
    const category_item = `
        <div id="category_${category.id}"class="badge rounded-pill bg-danger fw-normal shadow" style="--bs-bg-opacity:0.8">
            <div class="d-flex gap-2 align-items-center justify-items-center">
                <span>${category.category}</span>
                <i class="fa-solid fa-x" style="font-size:10px; cursor:pointer;"></i>
            </div>
        </div>
    `
    div.innerHTML = category_item;
    div.firstElementChild.addEventListener("click",()=>{deleteCategory(category.id)})
    category_items.appendChild(div.firstElementChild);
}

const clearGlobalBook = () => {
    CreateBookItem.book = {
        isbn:"",
        title:"",
        subtitle:"",
        author:"",
        publisher:"",
        publish_date:"",
        number_of_pages: null,
        category: []
    }
}
const renderImg = async (isbn) => {
    await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`)
    .then(response => response.blob())
    .then(blob => {
        const img = document.getElementById('result_img');
        img.src = URL.createObjectURL(blob);
        CreateBookItem.book.img_src = URL.createObjectURL(blob)
        console.log(CreateBookItem)
    });
}
export const renderBook = () => {
    document.getElementById("result_isbn").innerHTML = CreateBookItem.book.isbn;
    document.getElementById("result_title").innerHTML = CreateBookItem.book.title;
    document.getElementById("result_sub_title").innerHTML = CreateBookItem.book.subtitle;
    document.getElementById("result_author").innerHTML = CreateBookItem.book.author;
    document.getElementById("result_publisher").innerHTML = CreateBookItem.book.publisher;
    document.getElementById("result_published_date").innerHTML = CreateBookItem.book.publish_date;
    document.getElementById("result_page_count").innerHTML = CreateBookItem.book.number_of_pages;
}

export const searchBook = async () => {
    spinner(true);
    document.getElementById("category_items").innerHTML = ``;
    const isbn = document.getElementById("isbn").value.replace(/[-\s]/g, "");
    if (!isbn) {
        showToast("Geçerli Bir ISBN Girin","warning")
        return;
    };
    clearGlobalBook();
    CreateBookItem.book.isbn = isbn;
    await Promise.all([
        renderImg(isbn),
        fetchGoogleAPI(isbn),
    ]);
    await fetchOpenLibrary(isbn)

    renderBook();
    spinner(false);
}

export const textCapitalize = (text) => {
    return text
        .split(" ")
        .map(word => 
            word.charAt(0).toLocaleUpperCase('tr-TR') + 
            word.slice(1).toLocaleLowerCase('tr-TR')
        )
        .join(" ");
}

const deleteCategory = (id) => {
    CreateBookItem.book.category = CreateBookItem.book.category.filter(cat => String(cat.id) !== String(id));
    document.getElementById(`category_${id}`).remove();
}