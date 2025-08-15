// config.js
export const config =  {
    basePath: "/book-store/",
    // basePath: "/",
    scripts: [
        { src: "js/script.js", type: "module"},
        { src: "app.js", type: "module"},
        { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", base:false }
    ],
    styles: [
        { href: "css/style.css", rel: "stylesheet"},
        { rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css", integrity:"sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ==", crossorigin:"anonymous", referrerpolicy:"no-referrer", base:false},
        { href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", rel: "stylesheet", base:false }
    ]
};

export const pageQueryParameterKey = "";

// export const api_name_server = "http://localhost/api_book_db/";
export const api_name_server = "https://abdulbakidemir.com.tr/api_book_db/";

