import Popup from "./Popup.js"; 

export default class PopupWithImage extends Popup {
    constructor(popupSelector, image, caption) {
        super(popupSelector);
        this._popupImage = image;
        this._popupCaption = caption;
    }

    open(name, link) {
        this._popupImage.src = link;  
        this._popupImage.alt = name;
        this._popupCaption.textContent = name;
        super.open();
    }
}