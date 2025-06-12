class User {
  constructor({ uid, email, displayName, photoURL, createdAt }) {
    this.uid = uid;
    this.email = email;
    this.displayName = displayName || '';
    this.photoURL = photoURL || '';
    this.createdAt = createdAt || new Date();
  }
}

module.exports = User;