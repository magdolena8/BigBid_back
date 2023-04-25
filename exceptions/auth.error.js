module.exports = class AuthError extends Error {
  status;
  errors;
  constructor(staus, message, errors) {
    super(message);
    this.status = staus;
    this.errors = errors;
  }
  static NoUserFoundError() {
    return new AuthError(400, "User with given credentials not found");
  }

  static BadRequest(message, errors = []) {
    return new AuthError(400, message, errors);
  }
};
