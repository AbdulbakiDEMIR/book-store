export const AppState = {
    fetchBook: false,
    Books: [],
    Categories: [],
    Filters: { Search: "" }
};
export const CreateBookItem = {
    book:{
        isbn:"",
        title:"",
        subtitle:"",
        author:"", 
        publisher:"",
        publishedDate:"",
        pageCount: null,
        category: []
    }
}