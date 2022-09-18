export default class UserInfo {
  constructor( {name, about} ) {
      this._profileName = document.querySelector(name);
      this._profileAbout = document.querySelector(about);
  }

  getUserInfo() {
      this._userInfo = {};
      this._userInfo.name = this._profileName.textContent;
      this._userInfo.about = this._profileAbout.textContent;
      return this._userInfo;
  }

  setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileAbout.textContent = data.about;
  }
}