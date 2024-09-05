const router=require("express").Router();
const reviewController=require("../../controllers/App/Review/Librarian/librarian.controller")
let validator=require("../../helpers/common.validate") 
const {updateReviewValidation}=require("../../validation/review.validation")


router.get("/getAllReviews",
reviewController.getAllReviews) 


router.get("/reviews/statistics",
reviewController.getReviewStatistics) 


router.post('/flagInappropriateReview/:id',
reviewController.flagInappropriateReview)


router.post("/library/respond",
reviewController.respondToUserReview)


router.put("/updateReview/:id",validator(updateReviewValidation),
reviewController.updateReview) 


router.delete("/deleteReview/:id",
reviewController.deleteReview)  


module.exports=router