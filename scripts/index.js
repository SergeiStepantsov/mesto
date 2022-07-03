let profileEditButton = document.querySelector('.profile__edit-button'); // определяем переменную для edit кнопки
let popup = document.querySelector('.popup'); //опредляем перменную popup
let closePopupButton = popup.querySelector('.popup__close-button'); // определям переменную для кнопки close
let popupIsOpen = false; // определяем переменную фиксирующую открытый попап
let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_data_name'); // определяем перемунную для поля ввода имени
let inputAbout = formElement.querySelector('.popup__input_data_about'); // определяем перемунную для поля ввода о себе
let profileName = document.querySelector('.profile__name'); // определяем перемунную для Имени в блоке
let profileAbout = document.querySelector('.profile__about'); // определяем перемунную для Информации о себе в блоке
 
//лайк если получится ))
 let likeButtons = document.querySelectorAll('.element__like-button');
 function likeEnableDisable (event){
 if (event.target.classList.contains('element__like-button_active')){
  event.target.classList.remove('element__like-button_active');
 }else{
  event.target.classList.add('element__like-button_active');
 }
 }
 for (let i = 0; i < likeButtons.length; i++){
  likeButtons[i].addEventListener('click', likeEnableDisable);
 }

 //функция открытия-закрытия окна редактирования
function popupOpenClose () {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  if (popupIsOpen === false) {
    popup.classList.add('popup_opened');
    popupIsOpen = true;
  }
  else {
    popup.classList.remove('popup_opened');
    popupIsOpen = false;
  }
}
// отправка формы
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popupOpenClose();
}
// слушаем события
profileEditButton.addEventListener('click', popupOpenClose);
closePopupButton.addEventListener('click', popupOpenClose);
formElement.addEventListener('submit', formSubmitHandler);
