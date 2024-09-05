const router=require("express").Router();
const bookController=require("../../controllers/App/Book/Member/member.controller")


router.get("/getAllBooks",
bookController.getAllBooks) 

router.get("/book/:id",
bookController.getUserBookId)

router.get("/books/search",
bookController.searchBooks)  

router.get("/viewAvailableBooks",
bookController.viewAvailableBooks)  

router.get("/monitorBookStatus/:id",
bookController.monitorBookStatus)  




module.exports=router