const router=require("express").Router();
const reviewController=require("../../controllers/Admin/Review/review.controller")


router.get("/getAllReviews",
reviewController.getAllReviews) 

router.get("/review",
reviewController.getReviewById)


module.exports=router