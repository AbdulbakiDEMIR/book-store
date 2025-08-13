import { config, pageQueryParameterKey, api_name_server } from "../config.js"
import { renderApp } from "../routing/routing.js";
import { AppState } from "../states/BookStates.js";

export const changePage = function (newPage) {
    document.getElementById("app").innerHTML="";
    if(newPage===""){
        history.pushState(null, "", config.basePath);
    }
    else{
        history.pushState(null, "", config.basePath+"?"+pageQueryParameterKey+"="+newPage); // URL'yi değiştir
    }
    renderApp(); // URL değiştikten sonra hemen render et
}

window.scrollToSection = function (event) { 
    event.preventDefault();
    const href = event.target.getAttribute("href");
    const sectionId = href.substring(1);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    } 
};
export const changeTitle = function (title){
    document.title = title;
}

export const showToast = (message = "İşlem başarılı!", type = "success") => {
    // Tip: success, danger, warning, info vs.
    const toastEl = document.getElementById('liveToast');
    const toastBody = document.getElementById('toast-body');

    // Sınıf sıfırlama
    toastEl.className = `toast align-items-center text-white bg-${type} border-0`;

    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

export const spinner = function(isSpinner){
    if(isSpinner){
        document.getElementById("spinner-container").classList.remove("d-none");
        document.getElementById("spinner").classList.add("spinner-border");
    }else{
        document.getElementById("spinner-container").classList.add("d-none");
        document.getElementById("spinner").classList.remove("spinner-border");
    }
}

export const watchMediaQueries = (queriesAndHandlers) => {
    const mqs = [];

    Object.entries(queriesAndHandlers).forEach(([query, handler]) => {
        if (typeof handler !== 'function') return;
        const mq = window.matchMedia(query);
        const listener = (e) => { if (e.matches) handler(e); };
        // initial run
        if (mq.matches) handler({ matches: true, media: query });
        // listen
        mq.addEventListener ? mq.addEventListener('change', listener) : mq.addListener(listener);
        mqs.push({ mq, listener });
    });

    // cleanup fonksiyonu
    return () => {
        mqs.forEach(({ mq, listener }) => {
            mq.removeEventListener ? mq.removeEventListener('change', listener) : mq.removeListener(listener);
        });
    };
}


export const logout = () => {
    AppState.fetchBook = false 
    AppState.Books = [],
    AppState.Categories = [],
    AppState.Filters = { Search: "" }
    console.log(AppState)
    fetch(`${api_name_server}user_logout.php`, {
        method: "POST",
        credentials: "include" 
    })
    .then(response => response.json()) // Sunucudan gelen cevabı text olarak al
    .then(data => {
        if(data.success){
            changePage("login")
        }
    })
    .catch(error => {
        console.error("Hata:", error);
    });

}

export const loginCheck = async () => {
    const response = await fetch(`${api_name_server}user_check_session.php`,
        {
            method: "GET",
            credentials: "include" 
        }
    );
    const data = await response.json();
    return data.logged_in
    
}