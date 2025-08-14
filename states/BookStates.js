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
        publish_date:"",
        number_of_pages: null,
        category: []
    }
}