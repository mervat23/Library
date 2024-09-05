const router=require("express").Router();
const bookController=require("../../controllers/App/Book/Librarian/librarian.controller")
let validator=require("../../helpers/common.validate") 
const {createBookValidation,updateBookValidation}=require("../../validation/book.validation")


router.get("/getAllBooks",
bookController.getAllBooks) 

router.get("/book/:id",
bookController.getUserBookId)

router.get("/books/search",
bookController.searchBooks)  


router.post("/addBook",validator(createBookValidation),
bookController.addBook)

router.put("/updateBook/:id",validator(updateBookValidation),
bookController.updateBook) 

router.delete("/deleteBook/:id",
bookController.deleteBook)  

module.exports=router