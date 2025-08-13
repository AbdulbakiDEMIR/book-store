import { spinner, changePage } from "../../js/script.js";
import { api_name_server } from "../../config.js";

const Login = () => {
    return `
        <div class="container" style="height:100vh">
            <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                <h2 class="text-center">Kişisel Kütüphane</h2>
                <div class="form-container">
                    <div class="">
                        <label for="username"> Kullanıcı Adı</label>
                        <input id="username" class="form-control"/>
                    </div>
                    <div class="">
                        <label for="password"> Şifre</label>
                        <input type="password" id="password" class="form-control"/>
                    </div>
                    <div id="login" class="btn btn-primary">Giriş</div>
                </div>
            </div> 
        </div>
    `
} 

export const renderPage = () => {
    const container = document.getElementById("app");
    container.innerHTML = Login();

    document.getElementById("login").addEventListener("click", async ()=>{
        spinner(true)
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const isLogin = await login({username: username, password: password})
        if(isLogin){
            changePage("")
        }
        spinner(false)
    })
}

const login = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
        const response = await fetch(`${api_name_server}user_login.php`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });
        const result = await response.json();
        console.log("Sunucu cevabı:", result);
        return result.success; // ← şimdi doğru şekilde döner
    } catch (error) {
        console.error("Hata:", error);
        return false;
    }
}