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

const profileEditButton = document.querySelector('.profile__edit-button'); // определяем переменную для edit кнопки
const addElementButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close-button'); // определям переменную для кнопки close
const popup = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_edit-profile'); //опредляем перменную editProfile

const popupElementAdd = document.querySelector('.popup_add-element'); //опредляем перменную elementAdd

const popupZoomImage = document.querySelector('.popup_zoom-image');

const elementsContainer = document.querySelector('.elements');

const formElement = popupEditProfile.querySelector('.popup__form');
const inputName = formElement.querySelector('.popup__input_data_name'); // определяем переменную для поля ввода имени
const inputAbout = formElement.querySelector('.popup__input_data_about'); // определяем переменную для поля ввода о себе
const profileName = document.querySelector('.profile__name'); // определяем переменную для Имени в блоке
const profileAbout = document.querySelector('.profile__about'); // определяем переменную для Информации о себе в блоке

const formPlaceAdd = popupElementAdd.querySelector('.popup__form');



const popupOpen = function (item){
  item.classList.toggle('popup_opened');
  if (item.classList.contains('popup_opened' && 'popup_edit-profile')){
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
}
//функция открытия окна редактирования профиля
function popupEditProfileOpen () {
  popupOpen(popupEditProfile);
}


//функция открытия zoom контейнера
function popupZoomImageOpen(imgUrl, imgCap){
  popupZoomImage.querySelector('.popup__image').src = imgUrl;
  popupZoomImage.querySelector('.popup__image').alt = imgCap;
  popupZoomImage.querySelector('.popup__image-caption').textContent = imgCap;
  popupZoomImage.classList.toggle('popup_opened');
}


//добавление новой карточки открытия окна добавления карточки
function popupElementAddOpen () {
  popupOpen(popupElementAdd);
}

function addElement(placeNameValue, placeUrlValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__title').textContent = placeNameValue;
  cardElement.querySelector('.element__image').src = placeUrlValue;
  cardElement.querySelector('.element__image').alt = placeNameValue;
  cardElement.querySelector('.element__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like-button_active');
  });
  cardElement.querySelector('.element__remove-button').addEventListener('click',function(evt){
    evt.target.closest('.element').remove();
  });
  cardElement.querySelector('.element__image').addEventListener('click', function(evt){
    const popupImage = cardElement.querySelector('.element__image').src;
    const popupImageCaption = cardElement.querySelector('.element__image').alt;
    popupZoomImageOpen(popupImage, popupImageCaption);
  });
  
  elementsContainer.prepend(cardElement);
}
function placeFormSubmitHandler (evt) {
  evt.preventDefault(); 
  const placeName = formPlaceAdd.querySelector('.popup__input_place_name');
  const placeUrl = formPlaceAdd.querySelector('.popup__input_place_url');
  addElement(placeName.value, placeUrl.value);
  placeName.value = '';
  placeUrl.value = '';
  popupClose();
}
//инициализация карточек
initialCards.forEach(function(element){
  debugger
  const initialPlaceName = element.name;
  const initialPlaceUrl = element.link;
  addElement(initialPlaceName, initialPlaceUrl);
});
// отправка формы
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);
formPlaceAdd.addEventListener('submit', placeFormSubmitHandler);

// блок открытия-закрытия попапов -----------------
profileEditButton.addEventListener('click', popupEditProfileOpen);
addElementButton.addEventListener('click', popupElementAddOpen);

closePopupButton.forEach(function(item){
  item.addEventListener('click', popupClose);
});
function popupClose(){
  popup.forEach(function(item){
    item.classList.remove('popup_opened');
  });
};
//-----------конец блока открытия/закрытия попапов-----------
