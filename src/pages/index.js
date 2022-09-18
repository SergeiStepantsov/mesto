import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
initialCards,
formConfig,
profileEditButton,
profileAddButton,
popupEditProfile,
popupElementAdd,
popupZoomImage, 
nameInput,
aboutInput,
formEditProfile,
formPlaceAdd,
popupImage,
popupImageCaption
} from "../utils/constant.js";

const formValidationProfile = new FormValidator (formConfig, formEditProfile);
formValidationProfile.enableValidation();
const formValidationPlaceAdd = new FormValidator (formConfig, formPlaceAdd);
formValidationPlaceAdd.enableValidation();

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);
    }, 
  },
  '.element-template',
  );
  const cardElement = card.generateCard();
  
  return cardElement;
}

const elementsList = new Section(
{
  items: initialCards,
  renderer: (card) => {
    elementsList.addItem(createCard(card))
  }
}, 
'.elements'
);

elementsList.renderItems();

const popupWithImage = new PopupWithImage
(
  popupZoomImage, 
  popupImage, 
  popupImageCaption,
);
popupWithImage.setEventListeners();

const popupWithFormEditProfile = new PopupWithForm({
popupSelector: popupEditProfile,
handleFormSubmit: (item) => {
  userInfo.setUserInfo (item)
}
})

popupWithFormEditProfile.setEventListeners();

const popupWithFormAddCard = new PopupWithForm({
popupSelector: popupElementAdd,
handleFormSubmit: (card) => {
  elementsList.addItem(createCard(card))
}
})

popupWithFormAddCard.setEventListeners();

const userInfo = new UserInfo({
name: '.profile__name',
about: '.profile__about'
})

profileEditButton.addEventListener('click', () => {
  
const {name, about} = userInfo.getUserInfo();
nameInput.value = name;
aboutInput.value = about;
popupWithFormEditProfile.open();
});

profileAddButton.addEventListener('click', () => {
formValidationPlaceAdd.resetValidation();
popupWithFormAddCard.open();
})