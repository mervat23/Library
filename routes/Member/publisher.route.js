const router=require("express").Router();
const publisherController=require("../../controllers/App/Publisher/Member/member.controller")


router.get("/getPublisherBooks/:id",
publisherController.getPublisherBooks) 

router.get("/publisher/:id",
publisherController.getPublisherById)


router.get("/publishers/search",
publisherController.searchPublishers)



module.exports=router