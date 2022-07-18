const profileEditButton = document.querySelector('.profile__edit-button'); // определяем переменную для edit кнопки
const addElementButton = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close-button'); // определям переменную для кнопки close
const popup = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile'); //опредляем перменную editProfile
const popupElementAdd = document.querySelector('.popup_add-element'); //опредляем перменную elementAdd
const popupZoomImage = document.querySelectorAll('.element__image');


let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_data_name'); // определяем переменную для поля ввода имени
let inputAbout = formElement.querySelector('.popup__input_data_about'); // определяем переменную для поля ввода о себе
let profileName = document.querySelector('.profile__name'); // определяем переменную для Имени в блоке
let profileAbout = document.querySelector('.profile__about'); // определяем переменную для Информации о себе в блоке

const popupOpenClose = function (item){
  item.classList.toggle('popup_opened');
  if (item.classList.contains('popup_opened' && 'popup_edit-profile')){
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
}
//функция открытия окна редактирования профиля
function popupEditProfileOpen () {
  popupOpenClose(popupEditProfile);
}
//функция открытия окна добавления карточки
function popupElementAddOpen () {
  popupOpenClose(popupElementAdd);
}
//функция открытия zoom
function popupZoomImageOpen(){
  popupOpenClose(popupZoomImage);
}


// function popupClose (evt) {
//   evt.target.classList.toggle('popup_opened');
// }

// отправка формы
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupClose();
}
formElement.addEventListener('submit', formSubmitHandler);
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
