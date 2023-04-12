module.exports = function calculatePage(pageNumber, pageSize) {
  var limit = pageSize;
  var offset = pageNumber * pageSize;
  return [limit, offset];
};
