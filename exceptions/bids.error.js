module.exports = class BidsError extends Error {
  status;
  errors;
  constructor(staus, message, errors) {
    super(message);
    this.status = staus;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new BidsError(400, message, errors);
  }
};
