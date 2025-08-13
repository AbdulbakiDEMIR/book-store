import { changePage, login, logout } from "../js/script.js";

export const NavBar = () => {
    return `
        <div class="d-flex align-items-center justify-content-center gap-2 my-3 w-100">
            <div id="goToCreate" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Yeni Kitap Ekle</div>
            <div id="goToList" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Kitapları Gör</div>
            <div id="goToEdit" class="px-3 py-2 bg-primary fw-semibold text-white" style="cursor:pointer">Kitapları Düzenle</div>
            <div id="loginButton">login</div>
            <div id="logoutButton">logout</div>
        </div>
    `
}

export const NavBarEventLoader = () => {
    document.getElementById("goToCreate").addEventListener("click", ()=>{changePage("create")})
    document.getElementById("goToList").addEventListener("click", ()=>{changePage("")})
    document.getElementById("goToEdit").addEventListener("click", ()=>{changePage("edit")})
    document.getElementById("loginButton").addEventListener("click", ()=>{login()})
    document.getElementById("logoutButton").addEventListener("click", ()=>{logout()})
}