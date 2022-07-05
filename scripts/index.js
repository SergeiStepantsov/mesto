let profileEditButton = document.querySelector('.profile__edit-button'); // определяем переменную для edit кнопки
let popup = document.querySelector('.popup'); //опредляем перменную popup
let closePopupButton = popup.querySelector('.popup__close-button'); // определям переменную для кнопки close
let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_data_name'); // определяем переменную для поля ввода имени
let inputAbout = formElement.querySelector('.popup__input_data_about'); // определяем переменную для поля ввода о себе
let profileName = document.querySelector('.profile__name'); // определяем переменную для Имени в блоке
let profileAbout = document.querySelector('.profile__about'); // определяем переменную для Информации о себе в блоке
 
//функция открытия-закрытия окна редактирования
function popupOpenClose () {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
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