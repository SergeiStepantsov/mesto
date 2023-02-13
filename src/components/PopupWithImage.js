import Popup from "./Popup.js"; 

export default class PopupWithImage extends Popup {
    constructor(popupSelector, photo, title) {
        super(popupSelector);
        this._popupPhoto = photo;
        this._popupTitle = title;
    }

    open(name, link) {
        this._popupPhoto.src = link;  
        this._popupPhoto.alt = name;
        this._popupTitle.textContent = name;
        super.open();
    }
}