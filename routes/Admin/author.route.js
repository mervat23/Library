const router=require("express").Router();
const authorController=require("../../controllers/Admin/Author/author.controller")
let validator=require("../../helpers/common.validate") 
const {updateAuthorValidation}=require("../../validation/author.validation")


router.get("/getAllAuthors",
authorController.getAllAuthors) 

router.get("/author",
authorController.getAuthorById)



router.put("/updateAuthor/:id",validator(updateAuthorValidation),
authorController.updateAuthor) 

router.delete("/deleteAuthor/:id",
authorController.deleteAuthor)  

module.exports=router