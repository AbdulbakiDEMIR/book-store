export const AppState = {
    fetchBook: false,
    Books: [],
    RenderBooks: [],
    Categories: [],
    Filters: { Search: "" },
    BookCount : 20
};
export const CreateBookItem = {
    book:{
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