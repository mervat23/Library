const router=require("express").Router();
const publisherController=require("../../controllers/App/Publisher/Librarian/librarian.controller")
let validator=require("../../helpers/common.validate") 
const {updatePublisherValidation}=require("../../validation/publisher.validation")




router.get("/publisher/:id",
publisherController.getPublisherById)

router.get("/publishers/search",
publisherController.searchPublishers)


router.put("/updatePublisher/:id",validator(updatePublisherValidation),
publisherController.updatePublisher) 


module.exports=router