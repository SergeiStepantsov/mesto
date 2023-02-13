export default class UserInfo {
    constructor( {name, about, avatar} ) {
        this._profileName = document.querySelector(name);
        this._profileActivity = document.querySelector(about);
        this._profileAvatar = document.querySelector(avatar);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._profileName.textContent;
        this._userInfo.about = this._profileActivity.textContent;
        return this._userInfo;
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileActivity.textContent = data.about;
    }

    setUserAvatar(data) {
        this._profileAvatar.src = data.avatar;
    }

    getUserId() {
        return this._userId;
    }
}