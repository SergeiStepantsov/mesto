import Card from "./Cards.js";
import FormValidator from "./FormValidator.js";

const popups =document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupOpenPhoto = document.querySelector('.popup_type_photo');

const closeButton = document.querySelectorAll('.popup__close');
const closeButtonEditProfile = document.querySelector('.popup__close_type_edit-profile');
const closeButtonAddCard = document.querySelector('.popup__close_type_add-card');
const closeButtonPhoto = document.querySelector('.popup__close_type_photo');

const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');
const nameInput = document.querySelector('.form__input_field_name');
const jobInput = document.querySelector('.form__input_field_activity'); 
const placeInput = popupAddCard.querySelector('.form__input_field_place');
const linkInput = popupAddCard.querySelector('.form__input_field_link');
const submitButtonCard = popupAddCard.querySelector('.form__save');

const editButton = document.querySelector('.profile__edit-button');
const likeButton = document.querySelector('.element__like');
const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');

const elementTemplate = document.querySelector('#template-element').content;
const elementsList = document.querySelector('.elements');

const popupPhoto = document.querySelector('.popup__photo');
const popupTitle = document.querySelector('.popup__title');

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_disabled',
  inputErrorClass: 'form__input_type_error',
}


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


function openPopup(popupItem) {
    popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

function closePopup(popupItem) {
    popupItem.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

const closePopupEsc = (evt) => {
  if(evt.key === 'Escape') {
    const closeButtonEsc = document.querySelector('.popup_opened')
    closePopup(closeButtonEsc);
  }
}

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileActivity.textContent = jobInput.value;
    closePopup(popupEditProfile);
}

function handleCardClick(name, link) {
  popupPhoto.src = link;  
  popupPhoto.alt = name;
  popupTitle.textContent = name;
  openPopup(popupOpenPhoto);
}


  
function createCard(cardItem) {
    const card = new Card(cardItem, '.template-element', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement;
}

const renderInitialCards = (cardItem) => {
    elementsList.prepend(cardItem);
}

initialCards.forEach(function (cardItem) {
    const createAllCards = createCard(cardItem);
    renderInitialCards(createAllCards)
});


editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileActivity.textContent;
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    /*if((placeInput.validity.valueMissing) || (linkInput.validity.valueMissing)) {
      submitButtonCard.setAttribute('disabled', '');
      submitButtonCard.classList.add('form__save_disabled');
    }*/
    cardFormValidator.toggleButtonState();
})   

formEditProfile.addEventListener('submit', editFormSubmitHandler);

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const addNewCard ={
    name: placeInput.value,
    link: linkInput.value
  }
  const createNewCard = createCard(addNewCard);
  renderInitialCards(createNewCard);
  closePopup(popupAddCard);
  formAddCard.reset(); 
});

closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if(evt.target === evt.currentTarget) {
      closePopup(popup)
    }
  })
})

const cardFormValidator = new FormValidator(validationConfig, popupAddCard);
const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();