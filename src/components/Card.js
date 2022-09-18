export default class Card {
  constructor ({data, handleCardClick}, templateSelector){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src= this._link;
    this._elementImage.alt = this._name;
    return this._element;
  }

  _toggleLikeButton (evt) {
    evt.target.classList.toggle('element__like-button_active');
    
  }

  _removeElement (){
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._toggleLikeButton(evt);
    });
    this._element.querySelector('.element__remove-button').addEventListener('click', (evt) => {
      this._removeElement();
    });
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}