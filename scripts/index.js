import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
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

const formConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

//переменная для шаблона
//const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
//блок переменных для кнопок открыти
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');  
//блок переменных для всплывающих окон
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAdd = document.querySelector('.popup_add-element'); 
const popupZoomImage = document.querySelector('.popup_zoom-image'); 
//блок переменных для кнопок закрытия, лайк, корзина
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button'); 
const buttonCloseElementAdd = popupElementAdd.querySelector('.popup__close-button'); 
const buttonCloseZoomImage = popupZoomImage.querySelector('.popup__close-button'); 
//блок переменных для формы редактирования профиля
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_data_name'); 
const aboutInput = formEditProfile.querySelector('.popup__input_data_about'); 
const profileName = document.querySelector('.profile__name'); 
const profileAbout = document.querySelector('.profile__about'); 
//редактирование формы добавления карточки
const formPlaceAdd = popupElementAdd.querySelector('.popup__form');
const placeName = formPlaceAdd.querySelector('.popup__input_place_name');
const placeUrl = formPlaceAdd.querySelector('.popup__input_place_url');
//начало контейнера для добавления карточек
const elementsContainer = document.querySelector('.elements');
//zoom-контейнер
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

//открытие-закрытие окон с формами
const openPopup = function (popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByPressEsc);
  popup.addEventListener('mousedown', closePopupByClickOverlay);
}

const closePopup = function (popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByPressEsc);
  popup.removeEventListener('mousedown', closePopupByClickOverlay);
}

//закрытие по нажатию клафиши esc
const closePopupByPressEsc = function(evt){
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

//функция закрытия по клику на оверлей
function closePopupByClickOverlay (evt){
  const openedOverlayPopup = document.querySelector('.popup_opened');
  if (evt.target !== evt.currentTarget) {
  return;
 } else {
  closePopup (openedOverlayPopup);
 };
}

//функция открытия окна редактирования профиля
function openPopupEditProfile () {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  formValidationProfile.resetValidation();
  openPopup(popupEditProfile);
}

//функция закрытия окна редактирования профиля
function closePopupEditProfile () {
  closePopup(popupEditProfile);
}

//функция закрытия окна zoom контейнера
function closePopupZoomImage () {
  closePopup(popupZoomImage);
}

//функция открытия окна добваления карточки
function openPopupElementAdd () {
  formValidationPlaceAdd.resetValidation();
  openPopup(popupElementAdd);
}

//функция закрытия окна добваления карточки
function closePopupElementAdd () {
  closePopup(popupElementAdd);
}

//создание новой карточки и добавления в DOM
function createCard(cardItem){
  const card = new Card(cardItem, '.element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const renderCard = (cardItem) => {
  elementsContainer.prepend(cardItem);
}
//инициализация карточек
initialCards.forEach(function (cardItem) {
  const allCards = createCard(cardItem);
  renderCard(allCards)
});

function handleCardClick (name, link){
  popupImage.src = link;  
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(popupZoomImage);
}

function handlerPlaceFormSubmit (evt) {
  evt.preventDefault();
  const newCard ={
    name: placeName.value,
    link: placeUrl.value
  }
  const createNewCard = createCard(newCard);
  renderCard(createNewCard);
  // addElement(placeName.value, placeUrl.value);
  formPlaceAdd.reset();
  closePopupElementAdd();
}

// обработка формы с профилем
function handlerProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopupEditProfile ();
}

const formValidationProfile = new FormValidator (formConfig, formEditProfile);
formValidationProfile.enableValidation();

const formValidationPlaceAdd = new FormValidator (formConfig, formPlaceAdd);
formValidationPlaceAdd.enableValidation();

// обработка кнопок
formEditProfile.addEventListener('submit', handlerProfileFormSubmit);
formPlaceAdd.addEventListener('submit', handlerPlaceFormSubmit);
profileEditButton.addEventListener('click', openPopupEditProfile);
profileAddButton.addEventListener('click', openPopupElementAdd);
buttonCloseEditProfile.addEventListener('click', closePopupEditProfile); 
buttonCloseElementAdd.addEventListener('click', closePopupElementAdd); 
buttonCloseZoomImage.addEventListener('click', closePopupZoomImage);