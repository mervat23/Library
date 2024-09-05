const router=require("express").Router();
const authorController=require("../../controllers/App/Author/Librarian/librarian.controller")
let validator=require("../../helpers/common.validate") 
const {updateAuthorValidation}=require("../../validation/author.validation")


router.get("/getAuthorBooks/:id",
authorController.getAuthorBooks) 

router.get("/author/:id",
authorController.getAuthorById)

router.get("/authors/search",
authorController.searchAuthors)  



router.put("/updateAuthor/:id",validator(updateAuthorValidation),
authorController.updateAuthor) 

router.delete("/deleteAuthor/:id",
authorController.deleteAuthor)  

module.exports=router