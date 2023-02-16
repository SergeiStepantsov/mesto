import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {
  popupEditProfile,
  popupAddCard,
  popupOpenPhoto,
  nameInput,
  jobInput,
  editButton,
  addButton,
  validationConfig,
  //initialCards,
  popupPhoto,
  popupTitle,
  avatarButton,
  popupAvatar,
  popupDeleteCard
} from '../utils/constants.js';

let userId = null;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '77ad2846-41df-4b5a-8a37-1e87db36689e',
    'Content-Type': 'application/json'
  }
});

const cardFormValidator = new FormValidator(validationConfig, popupAddCard);
const profileFormValidator = new FormValidator(validationConfig, popupEditProfile);
const avatarFormValidator = new FormValidator(validationConfig, popupAvatar);

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage
  (
    popupOpenPhoto, 
    popupPhoto, 
    popupTitle,
  );
popupWithImage.setEventListeners();

const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: popupEditProfile,  
  handleFormSubmit: (data) => {
    popupWithFormEditProfile.isLoadingMessage(true);  
    api.editProfile(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupWithFormEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEditProfile.isLoadingMessage(false);
      })
  }
}
)

popupWithFormEditProfile.setEventListeners();

const popupWithFormAddCard = new PopupWithForm({
  popupSelector: popupAddCard,
  handleFormSubmit: (data) => {
    popupWithFormAddCard.isLoadingMessage(true);
    api.addNewCard(data)
      .then((data) => {
        elementsList.addItem(createCard(data));
        popupWithFormAddCard.close()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAddCard.isLoadingMessage(false);
      })
  }
}
)

popupWithFormAddCard.setEventListeners();

const popupWithFormAvatar = new PopupWithForm({
  popupSelector: popupAvatar,
  handleFormSubmit: (data) => {
    popupWithFormAvatar.isLoadingMessage(true);
    api.editAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
        popupWithFormAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAvatar.isLoadingMessage(false);
      })
  }
}
)

popupWithFormAvatar.setEventListeners();


const confirmDeletions = new PopupWithConfirmation({
  popupSelector: popupDeleteCard,
  handleSubmit: (cardId, cardElement) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.deleteCard();
        confirmDeletions.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
} 
)

confirmDeletions.setEventListeners();

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__activity',
  avatar: '.profile__avatar'
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cardsData]) => {
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData);
  userId = userData._id;
  console.log(userData)
  console.log(cardsData);
  elementsList.renderItems(cardsData);
})
.catch((err) => {
  console.log(err);
})

const createCard = (data) => {
  const card = new Card({
    data,
    handleCardClick: () => {
      popupWithImage.open(data.name, data.link);
    }, 
    handleLikeClick: () => {
      if(card.checkUserLike()) {
        api.deleteLike(data._id)
          .then((data) => {
            card.deleteLike();
            card.countLike(data.likes);
          })
          .catch((err) =>{
            console.log(err);
          })
      } else {
        api.setLike(data._id) 
          .then((data) => {
            card.setLike();
            card.countLike(data.likes);
            
          })
          .catch((err) => {
            console.log(err);
          })
      }
    },
    handleRemoveClick: () => {
      confirmDeletions.open();
      confirmDeletions.deleteCard(data._id, card);
    }
  },
    '.template-element',
    userId
  );
  const element = card.generateCard();
  
  return element;
}

const elementsList = new Section(
  {
    renderer: (card) => {
      elementsList.addNewItem(createCard(card))
    }
  }, 
  '.elements'
);

editButton.addEventListener('click', () => {
  const {name, about} = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  popupWithFormEditProfile.open();
});

addButton.addEventListener('click', () => {
  cardFormValidator.toggleButtonState();
  popupWithFormAddCard.open();
})

avatarButton.addEventListener('click', () => {
  avatarFormValidator.toggleButtonState();
  popupWithFormAvatar.open();
})
