import { changePage,  logout } from "../js/script.js";

export const NavBar = (className) => {
    return `
        <div class="d-flex ${className} gap-2 my-3 w-100">
            <div id="goToCreate" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Kitap Ekle</div>
            <div id="goToList" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Kitaplar</div>
            <div id="goToEdit" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Düzenle</div>
            <div id="logoutButton" class="px-3 py-2 bg-danger fw-semibold text-white" style="cursor:pointer">Çıkış</div>
        </div>
    `
}

export const NavBarEventLoader = () => {
    document.getElementById("goToCreate").addEventListener("click", ()=>{changePage("create")})
    document.getElementById("goToList").addEventListener("click", ()=>{changePage("")})
    document.getElementById("goToEdit").addEventListener("click", ()=>{changePage("edit")})
    document.getElementById("logoutButton").addEventListener("click", ()=>{logout()})
}
