export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//переменная для шаблона
//export const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
//блок переменных для кнопок открыти
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');  
//блок переменных для всплывающих окон
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const popupElementAdd = document.querySelector('.popup_add-element'); 
export const popupZoomImage = document.querySelector('.popup_zoom-image'); 
//блок переменных для формы редактирования профиля
export const formEditProfile = popupEditProfile.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_data_name'); 
export const aboutInput = formEditProfile.querySelector('.popup__input_data_about'); 
export const profileName = document.querySelector('.profile__name'); 
export const profileAbout = document.querySelector('.profile__about'); 
//редактирование формы добавления карточки
export const formPlaceAdd = popupElementAdd.querySelector('.popup__form');
export const placeName = formPlaceAdd.querySelector('.popup__input_place_name');
export const placeUrl = formPlaceAdd.querySelector('.popup__input_place_url');
//начало контейнера для добавления карточек
export const elementsContainer = document.querySelector('.elements');
//zoom-контейнер
export const popupImage = document.querySelector('.popup__image');
export const popupImageCaption = document.querySelector('.popup__image-caption');