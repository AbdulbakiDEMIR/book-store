export function ToastMessage(){
    return `
        <div class="position-fixed end-0 top-0 p-3" style="z-index: 9999">
            <div id="liveToast" class="toast align-items-center ms-auto text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body" id="toast-body">
                        İşlem başarılı!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </div>
    `
}