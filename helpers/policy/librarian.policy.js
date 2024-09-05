const endPoints=require("../endPoints")


module.exports=[
  endPoints.GET_AUTHORS_BOOKS,
  endPoints.GET_AUTHOR_BY_ID,
  endPoints.SEARCH_AUTHORS,
  endPoints.UPDATE_AUTHOR,
  endPoints.DELETE_AUTHOR,


  endPoints.GET_ALL_BOOKS,
  endPoints.GET_BOOK_BY_ID,
  endPoints.SEARCH_BOOKS,
  endPoints.ADD_BOOK,
  endPoints.UPDATE_BOOK,
  endPoints.DELETE_BOOK,

  endPoints.ADD_BORROWING,
  endPoints.GET_ALL_BORROWING,
  endPoints.UPDATE_BORROWING,
  endPoints.CANCEL_BORROWING,


  endPoints.GET_PUBLISHER_BY_ID,
  endPoints.SEARCH_PUBLISHERS,
  endPoints.UPDATE_PUBLISHER,



  endPoints.GET_ALL_REVIEWS,
  endPoints.GET_REVIEW_STATISTICS,
  endPoints.FLAG_INAPPROPRIATE_REVIEW,
  endPoints.RESPOND_TO_USER_REVIEW,
  endPoints.UPDATE_REVIEW,
  endPoints.DELETE_REVIEW,



  endPoints.GET_USER_BY_ID,
  endPoints.DELETE_USER




]