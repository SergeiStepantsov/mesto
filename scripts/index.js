//переменная для шаблона
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
//блок переменных для кнопок открыти
const profileEditButton = document.querySelector('.profile__edit-button');
const addElementButton = document.querySelector('.profile__add-button');  
//блок переменных для всплывающих окон
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupElementAdd = document.querySelector('.popup_add-element'); 
const popupZoomImage = document.querySelector('.popup_zoom-image'); 
//блок переменных для кнопок закрытия
const closeButtonEditProfile = popupEditProfile.querySelector('.popup__close-button'); 
const closeButtonElementAdd = popupElementAdd.querySelector('.popup__close-button'); 
const closeButtonZoomImage = popupZoomImage.querySelector('.popup__close-button'); 
//блок переменных для формы редактирования профиля
const formElement = popupEditProfile.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__input_data_name'); 
const inputAbout = formElement.querySelector('.popup__input_data_about'); 
const profileName = document.querySelector('.profile__name'); 
const profileAbout = document.querySelector('.profile__about'); 
//редактирование формы добавления карточки
const formPlaceAdd = popupElementAdd.querySelector('.popup__form');
const placeName = formPlaceAdd.querySelector('.popup__input_place_name');
const placeUrl = formPlaceAdd.querySelector('.popup__input_place_url');
//начало контейнера для добавления карточек
const elementsContainer = document.querySelector('.elements');
//открытие-pfrhsnbt окон с формами
const openClosePopup = function (popup){
  popup.classList.toggle('popup_opened');
}
//функция открытия окна редактирования профиля
function openPopupEditProfile () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openClosePopup(popupEditProfile);
}
//функция закрытия окна редактирования профиля
function closePopupEditProfile () {
  openClosePopup(popupEditProfile);
}
//функция открытия zoom контейнера
function openPopupZoomImage(imgUrl, imgCap){
  popupZoomImage.querySelector('.popup__image').src = imgUrl;
  popupZoomImage.querySelector('.popup__image').alt = imgCap;
  popupZoomImage.querySelector('.popup__image-caption').textContent = imgCap;
  openClosePopup(popupZoomImage);
}
//функция закрытия окна zoom контейнера
function closePopupZoomImage () {
  openClosePopup(popupZoomImage);
}
//функция открытия окна добваления карточки
function openPopupElementAdd () {
  openClosePopup(popupElementAdd);
}
//функция закрытия окна добваления карточки
function closePopupElementAdd () {
  openClosePopup(popupElementAdd);
}
//создание новой карточки и добавления в DOM
function createCard(placeNameValue, placeUrlValue){
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__title').textContent = placeNameValue;
  const cardElementImage = cardElement.querySelector('.element__image');
  cardElementImage.src = placeUrlValue;
  cardElementImage.alt = placeNameValue;
  cardElement.querySelector('.element__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__remove-button').addEventListener('click',function(evt){
    cardElement.remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', function(evt){
    const popupImage = cardElement.querySelector('.element__image').src;
    const popupImageCaption = cardElement.querySelector('.element__image').alt;
    openPopupZoomImage(popupImage, popupImageCaption);
  });
  return cardElement;
}
function addElement(placeNameValue, placeUrlValue) {
  const cardElementAdd = createCard(placeNameValue, placeUrlValue);
  elementsContainer.prepend(cardElementAdd);
}
//инициализация карточек
initialCards.forEach(function(element){
  const initialPlaceName = element.name;
  const initialPlaceUrl = element.link;
  addElement(initialPlaceName, initialPlaceUrl);
});
// обработка формы с карточкой
function placeFormSubmitHandler (evt) {
  evt.preventDefault(); 
  addElement(placeName.value, placeUrl.value);
  formPlaceAdd.reset();
  closePopupElementAdd();
}
// обработка формы с профилем
function profileFormSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopupEditProfile ();
}
// обработка кнопок
formElement.addEventListener('submit', profileFormSubmitHandler);
formPlaceAdd.addEventListener('submit', placeFormSubmitHandler);
profileEditButton.addEventListener('click', openPopupEditProfile);
addElementButton.addEventListener('click', openPopupElementAdd);

closeButtonEditProfile.addEventListener('click', closePopupEditProfile); 
closeButtonElementAdd.addEventListener('click', closePopupElementAdd); 
closeButtonZoomImage.addEventListener('click', closePopupZoomImage);
