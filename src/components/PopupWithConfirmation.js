import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor({popupSelector, handleSubmit}) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
    }

    deleteCard(cardId, cardElement) {
        this._cardId = cardId;
        this._cardElement = cardElement;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) =>{
            evt.preventDefault();
            this._handleSubmit(this._cardId, this._cardElement);    
        })
    }
}