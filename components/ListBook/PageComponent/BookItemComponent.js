import { CategoryItem } from "./CategoryItemComponent.js";

export const BookItem = (book_item) => {
    let book_item_categories = ``
    book_item.category.forEach(element => {
        book_item_categories += CategoryItem(element)
    });
    return`
        <div id="book_${book_item.isbn}" class="col p-2">
            <div class="py-2 w-100 text-center">
                <div class="w-100 bg-dark">
                    <img src="${book_item.img_src}" class="book-img"/>
                </div>
                <div class="w-100 d-flex flex-column mt-2" >
                                       ${book_item.title ? `<h5 class="book_info_text fw-bold m-0" data-bs-toggle="tooltip" data-bs-title="${book_item.title}">${book_item.title}</h5>` : ''}
                    ${book_item.subtitle ? `<h6 class="book_info_text" data-bs-toggle="tooltip" data-bs-title="${book_item.subtitle}">${book_item.subtitle}</h6>` : ''}
                    ${book_item.author ? `<h6 class="book_info_text fw-bolder" data-bs-toggle="tooltip" data-bs-title="${book_item.author}">${book_item.author}</h6>` : ''}
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