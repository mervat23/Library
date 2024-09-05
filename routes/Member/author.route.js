const router=require("express").Router();
const authorController=require("../../controllers/App/Author/Member/member.controller")


router.get("/getAuthorBooks/:id",
authorController.getAuthorBooks) 

router.get("/author/:id",
authorController.getAuthorById)

router.get("/authors/search",
authorController.searchAuthors)  



module.exports=router