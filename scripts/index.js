let profileEditButton = document.querySelector('.profile__edit-button'); // определяем переменную для edit кнопки
let popup = document.querySelector('.popup'); //опредляем перменную popup
let closePopupButton = popup.querySelector('.popup__close-button'); // определям переменную для кнопки close
let popupIsOpen = false; // определяем переменную фиксирующую открытый попап
let formElement = document.querySelector('.popup__form');
let inputName = formElement.querySelector('.popup__input_data_name'); // определяем переменную для поля ввода имени
let inputAbout = formElement.querySelector('.popup__input_data_about'); // определяем переменную для поля ввода о себе
let profileName = document.querySelector('.profile__name'); // определяем переменную для Имени в блоке
let profileAbout = document.querySelector('.profile__about'); // определяем переменную для Информации о себе в блоке
 
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

//функция постановки лайка (по заданию нет, проба)
let likeButtons = document.querySelectorAll('.element__like-button'); // определили массив всех кнопок лай
for (let i = 0; i < likeButtons.length; i++){                        // навесили на все кнопки лайк слушателя события клика
 likeButtons[i].addEventListener('click', likeEnableDisable);
}
function likeEnableDisable (event){                                        //функция включения/отключения лайка
if (event.target.classList.contains('element__like-button_active')){       // считываем целевой лайк, по которуму кликнули и 
 event.target.classList.remove('element__like-button_active');             //проверяем активен ли он
}else{                                                                     //если да то отключаем, иначе включаем
 event.target.classList.add('element__like-button_active');
}
}