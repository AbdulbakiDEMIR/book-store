export function Modal({content, id, btn1, btn2}){
    const modal = `
        <div class="modal fade " id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true" style="z-index:12">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${id}Label">${content.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${content.body}
                    </div>
                    <div class="modal-footer">
                        <button id="${id}Btn1" type="button" class="${btn1.class}" data-bs-dismiss="modal">${btn1.content}</button>
                        <button id="${id}Btn2" type="button" class="${btn2.class}" >${btn2.content}</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return modal;
}

export function ModalButton(content, id, className=""){
    return`
        <button type="button"  class="${className}" data-bs-toggle="modal" data-bs-target="#${id}">
            ${content}
        </button>
    `
}

export const ModalHide = (id) => {
    const modal = document.getElementById(id);
    modal.querySelector("div > div > div.modal-header > button").click();
}

export const OpenModal = (id) => {
    const modalElement = document.getElementById(id);
    const modal = new bootstrap.Modal(modalElement); // Bootstrap 5 API
    modal.show(); // Modalı açar
}