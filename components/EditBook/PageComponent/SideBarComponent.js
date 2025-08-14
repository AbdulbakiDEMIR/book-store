import { filterBook } from "./FilterFunction.js";
import { AppState } from "../../../states/BookStates.js";
import { NavBar, NavBarEventLoader } from "../../NavBar.js";

const CategoryFilterFunc = (event) => {
    if (!Array.isArray(AppState.Filters.Categories)) {
        AppState.Filters.Categories = [];
    }
    const value =  Number(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
        if (!AppState.Filters.Categories.includes(value)) {
            AppState.Filters.Categories.push(value);
        }
    } else {
        AppState.Filters.Categories = AppState.Filters.Categories.filter(
            item => item !== value
        );
    }
    filterBook()
}
const AuthorFilterFunc = (event) => {
    if (!Array.isArray(AppState.Filters.Authors)) {
        AppState.Filters.Authors = [];
    }
    const value =  event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
        if (!AppState.Filters.Authors.includes(value)) {
            AppState.Filters.Authors.push(value);
        }
    } else {
        AppState.Filters.Authors = AppState.Filters.Authors.filter(
            item => item !== value
        );
    }
    filterBook()
}
const PublisherFilterFunc = (event) => {
    if (!Array.isArray(AppState.Filters.Publisher)) {
        AppState.Filters.Publisher = [];
    }
    const value =  event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
        if (!AppState.Filters.Publisher.includes(value)) {
            AppState.Filters.Publisher.push(value);
        }
    } else {
        AppState.Filters.Publisher = AppState.Filters.Publisher.filter(
            item => item !== value
        );
    }
    filterBook()
}


const CategoryFilterComponent = () => {
    let category_filter_elements = ``
    AppState.Categories.map(category => {
        category_filter_elements += `
            <div class="d-flex gap-2">
                <input class="category-filter-checkbox form-check-input" type="checkbox" value="${category.id}" id="filter_category_input_${category.id}"/>
                <label for="filter_category_input_${category.id}">${category.category ? category.category : "Kategori Yok"}</label>
            </div>
        `
    })
    return category_filter_elements;
}

const AuthorFilterComponent = () =>{
    const uniqueAuthors = [...new Set(
        AppState.Books.flatMap(book =>
            book.author
                .split(",")        // Virgülle ayrılmış yazarları ayır
                .map(a => a.trim()) // Boşlukları temizle
        )
    )].sort((a, b) => a.localeCompare(b, 'tr'));


    let author_filter_elements = ``;
    uniqueAuthors.map(author => {
        const safeId = author
            .replace(/[^\w\s]/g, '')   
            .trim()                    
            .replace(/\s+/g, '_'); 
        author_filter_elements += `
            <div class="d-flex gap-2">
                <input class="author-filter-checkbox form-check-input" type="checkbox" value="${author}" id="filter_author_input_${safeId}"/>
                <label for="filter_author_input_${safeId}">${author ? author : "Yazar Yok"}</label>
            </div>
        `
    })
    return author_filter_elements
}

const PublisherFilterComponent = () =>{
    const uniquePublisher = [...new Set(
        AppState.Books.flatMap(book =>
            book.publisher
                .split(",")        // Virgülle ayrılmış yazarları ayır
                .map(a => a.trim()) // Boşlukları temizle
        )
    )].sort((a, b) => a.localeCompare(b, 'tr'));

    let publisher_filter_elements = ``;
    uniquePublisher.map(publisher => {
        const safeId = publisher
            .replace(/[^\w\s]/g, '')   
            .trim()                    
            .replace(/\s+/g, '_'); 
        publisher_filter_elements += `
            <div class="d-flex gap-2">
                <input class="publisher-filter-checkbox form-check-input" type="checkbox" value="${publisher}" id="filter_publisher_input_${safeId}"/>
                <label for="filter_publisher_input_${safeId}">${publisher ? publisher : "Yayıncı Yok"}</label>
            </div>
        `
    })
    return publisher_filter_elements
}


export const SideBar = () => {
    return`
        <div class="accordion" id="FilterAccordion">
            <h5 class="ps-3">Filtre</h5>
            <div class="accordion-item border-0">
                <h2 class="accordion-header" id="filter_category_accordion">
                    <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_category" aria-expanded="true" aria-controls="collapse_category">
                    Kategori
                    </button>
                </h2>
                <div id="collapse_category" class="accordion-collapse collapse border-none" aria-labelledby="headingOne" >
                    <div class="accordion-body px-2">
                        ${CategoryFilterComponent()}
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <h2 class="accordion-header" id="filter_author_accordion">
                    <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_author" aria-expanded="true" aria-controls="collapse_author">
                    Yazar
                    </button>
                </h2>
                <div id="collapse_author" class="accordion-collapse collapse border-none" aria-labelledby="headingOne" >
                    <div class="accordion-body px-2">
                        ${AuthorFilterComponent()}
                    </div>
                </div>
            </div>
            <div class="accordion-item border-0">
                <h2 class="accordion-header" id="filter_publisher_accordion">
                    <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_publisher" aria-expanded="true" aria-controls="collapse_publisher">
                    Yayıncı
                    </button>
                </h2>
                <div id="collapse_publisher" class="accordion-collapse collapse border-none" aria-labelledby="headingOne" >
                    <div class="accordion-body px-2">
                        ${PublisherFilterComponent()}
                    </div>
                </div>
            </div>
        </div>
        ${NavBar("flex-column")}
    `
}


export const SideBarEventLoader = () => {
    document.querySelectorAll(".category-filter-checkbox").forEach(element => {
        element.addEventListener("click", (event) => {CategoryFilterFunc(event)})
    })
    document.querySelectorAll(".author-filter-checkbox").forEach(element => {
        element.addEventListener("click", (event) => {AuthorFilterFunc(event)})
    })
    document.querySelectorAll(".publisher-filter-checkbox").forEach(element => {
        element.addEventListener("click", (event) => {PublisherFilterFunc(event)})
    })
    NavBarEventLoader()
}