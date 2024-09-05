const router=require("express").Router();
const publisherController=require("../../controllers/Admin/Publisher/publisher.controller")
let validator=require("../../helpers/common.validate") 
const {updatePublisherValidation}=require("../../validation/publisher.validation")


router.get("/getAllPublishers",
publisherController.getAllPublishers) 

router.get("/publisher",
publisherController.getPublisherById)



router.put("/updatePublisher/:id",validator(updatePublisherValidation),
publisherController.updatePublisher) 

router.delete("/deletePublisher/:id",
publisherController.deletePublisher)  


module.exports=router