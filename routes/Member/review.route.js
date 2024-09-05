const router=require("express").Router();
const reviewController=require("../../controllers/App/Review/Member/member.controller")
let validator=require("../../helpers/common.validate") 
const {createReviewValidation,updateReviewValidation}=require("../../validation/review.validation")


router.get("/getAllReviews",
reviewController.getAllReviews) 

router.get("/user/reviews/:id",
reviewController.viewOwnReviews)

router.get("/getBookReviews/:id",
reviewController.getBookReviews) 

router.post("/addReview",validator(createReviewValidation),
reviewController.addReview)

router.put("/updateReview/:id",validator(updateReviewValidation),
reviewController.updateReview) 

router.delete("/deleteReview/:id",
reviewController.deleteReview)  

module.exports=router