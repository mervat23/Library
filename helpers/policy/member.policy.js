const endPoints=require("../endPoints")


module.exports=[
  
   endPoints.GET_AUTHOR_BY_ID,
   endPoints.GET_AUTHORS_BOOKS,
   endPoints.SEARCH_AUTHORS,

   
   endPoints.GET_ALL_BOOKS,
   endPoints.GET_BOOK_BY_ID,
   endPoints.SEARCH_BOOKS,
   endPoints.VIEW_AVAILABLE_BOOKS,
   endPoints.MONITOR_BOOK_STATUS,

  

  endPoints.GET_BORROWING_BY_ID,
  endPoints.VIEW_BORROWING_STATUS,
  endPoints.CANCEL_BORROWING,



  endPoints.GET_PUBLISHER_BOOKS,
  endPoints.GET_PUBLISHER_BY_ID,
  endPoints.SEARCH_PUBLISHERS,


  endPoints.GET_ALL_REVIEWS,
  endPoints.VIEW_OWN_REVIEWS,
  endPoints.GET_BOOK_REVIEWS,
  endPoints.CREATE_REVIEW,
  endPoints.UPDATE_REVIEW,
  endPoints.DELETE_REVIEW,



  endPoints.GET_USER_BY_ID,
  endPoints.GET_BORROWING_BY_ID,
  endPoints.GET_BOOK_REVIEWS,
  endPoints.VIEW_AVAILABLE_BOOKS,
  endPoints.VIEW_OWN_REVIEWS


]