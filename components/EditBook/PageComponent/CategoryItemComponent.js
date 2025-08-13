import { AppState } from "../../../states/BookStates.js";

export const CategoryItem = (category_item_id) => {
    const category_item = AppState.Categories.find(item => item.id == category_item_id)
    return `
        <div id="category_${category_item.id}"class="badge rounded-pill bg-danger fw-normal shadow" style="--bs-bg-opacity:0.8">
            <div class="d-flex gap-2 align-items-center justify-items-center">
                <span>${category_item.category}</span>
            </div>
        </div>
    `
}