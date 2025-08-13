import { routing_data } from "../routing/routing_data.js";
import { NotFoundPage } from "../pages/404_page_not_found.js";
import { pageQueryParameterKey } from "../config.js";
import { spinner } from "../js/script.js";

function getParams(paramsName) {
    const search = window.location.search; 

    const params = new URLSearchParams(search);
    const params_value = params.get(paramsName);
    return params_value;
};

export function renderApp() {
    spinner(true);
    const page = getParams(pageQueryParameterKey) ? getParams(pageQueryParameterKey) : ""; // Yeni URL'yi al
    
    const route = routing_data.find(route => route.path === page);
    if (route) {
        route.page(); // İlgili sayfa fonksiyonunu çağırır
    } else {
        // Eğer eşleşme yoksa bir 404 sayfası gösterebilirsiniz
        NotFoundPage()
    } 
    spinner(false)
}