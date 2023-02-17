export default class Card {
    constructor( {data, handleCardClick, handleLikeClick, handleRemoveClick},  templateSelector, userId ) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveClick = handleRemoveClick;
        this._userId = userId;
        this._likes = data.likes; 
        this._id = data.id;
        this._owner = data.owner._id;
    }

    getCardId() {
      return this._id
    }

    _getTemplate() {
      const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

      return cardElement; 
    }

    generateCard() {
      this._element = this._getTemplate();  
      this._elementPhoto = this._element.querySelector('.element__photo');
      this._elementLike = this._element.querySelector('.element__like');  
      this._deleteButton = this._element.querySelector('.element__delete');
      this._setEventListeners();
      this._element.querySelector('.element__title').textContent = this._name;
      this._elementPhoto.src= this._link;
      this._elementPhoto.alt = this._name;
      this._likeCounter = this._element.querySelector('.element__like-count');  
      this.countLike(this._likes);
      this.removeButtonDelete();
     
      return this._element;
    }
    
    _setEventListeners() {
      this._elementPhoto.addEventListener('click', () => {
        this._handleCardClick();  
      });

      this._elementLike.addEventListener('click', (evt) => {
        this._handleLikeClick(evt);
      });

      this._deleteButton.addEventListener('click', () => {
        this._handleRemoveClick();
      });
      
    }

    _setLike() {
      this._elementLike.classList.add('element__like_active');
    }
    
    _deleteLike() {
      this._elementLike.classList.remove('element__like_active');
    }

    deleteCard() { 
      this._element.remove(); 
      this._element = null; 
    } 

    countLike(data) {
      this._likes = data;
      this._likeCounter.textContent = this._likes.length; 
      if (this.checkUserLike()) {
        this._setLike();
      } else {
        this._deleteLike();  
      }
    }

    checkUserLike() {
      return this._likes.some(user => user._id === this._userId);
    }
    
    removeButtonDelete() {
      if (this._owner !== this._userId) {
        this._deleteButton.remove();
      }
    }
}





