import { BookItem, BookItemEventLoader } from "./BookItemComponent.js";
import { spinner } from "../../../js/script.js";
import { AppState } from "../../../states/BookStates.js";


export const filterBook = () => {
    spinner(true)
    let filteredBooks = [...AppState.Books]
    if (AppState.Filters.Categories && AppState.Filters.Categories.length > 0) {
        filteredBooks = filteredBooks.filter(book =>
            AppState.Filters.Categories.every(catId => book.category.includes(catId))
        );
    }
    if (AppState.Filters.Authors && AppState.Filters.Authors.length > 0) {
        filteredBooks = filteredBooks.filter(book => {
            const authors = book.author.split(",").map(a => a.trim());
            return authors.some(author => AppState.Filters.Authors.includes(author));
        });
    }
    if (AppState.Filters.Publisher && AppState.Filters.Publisher.length > 0) {
        filteredBooks = filteredBooks.filter(book => {
            const publishers = book.publisher.split(",").map(a => a.trim());
            return publishers.some(publisher => AppState.Filters.Publisher.includes(publisher));
        });
    }
    if (AppState.Filters.Search && AppState.Filters.Search.trim() !== "") {
        const searchTerm = AppState.Filters.Search.trim().toLocaleLowerCase('tr');
        filteredBooks = filteredBooks.filter(book => {
            const titleMatch = book.title && book.title.toLocaleLowerCase('tr').includes(searchTerm);
            const subtitleMatch = book.subtitle && book.subtitle.toLocaleLowerCase('tr').includes(searchTerm);
            const authorMatch = book.author && book.author.toLocaleLowerCase('tr').includes(searchTerm);
            return titleMatch || subtitleMatch || authorMatch;
        });
    }
    filterBooksRender(filteredBooks);
}

const filterBooksRender = (filteredBooks) => {
    const booksContainer = document.getElementById("Books");
    booksContainer.innerHTML = ``;
    filteredBooks.map(element => {
        const div = document.createElement("div");
        div.innerHTML = BookItem(element);
        booksContainer.appendChild(div.firstElementChild);
    })
    BookItemEventLoader()
    spinner(false)
}