const {list,update,remove,flagReview,getStatistics}=require("../../../../modules/Review/review.repo")
const {respondToReview}=require("../../../../modules/User/user.repo")


const getAllReviews = async (req, res) => {
  try {
    const reviews = await list();

    if (reviews) {
  
      res.status(reviews.code).json(reviews);
    } else {
      res.status(reviews.code).json({ error: reviews.error});
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const updateReview= async (req, res) => {
  try {
    const targetReviewId = req.params.id;
    const updatedFields = req.body;
    const result = await update(targetReviewId, updatedFields);
    if (result ) {
      res.status(result.code).json(result);
    } else {
      res.status(result.code).json({ error: result.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const deleteReview = async (req, res) => {
  try {
    const targetReviewId = req.params.id;
    const deletedCount = await remove(targetReviewId );

    if (deletedCount) {
      res.status(deletedCount.code).json(deletedCount);
    } else {
      res.status(deletedCount.code).json({error:deletedCount.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const flagInappropriateReview = async (req, res) => {
  try {
    let reviewId = req.params.id;
    const review = await flagReview(reviewId);

    if (review) {
      res.status(review.code).json(review);
    } else {
      res.status(review.code).json(review.error);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const getReviewStatistics = async (req, res) => {
  try {
    const reviews = await getStatistics();

    if (reviews) {
  
      res.status(reviews.code).json(reviews);
    } else {
      res.status(reviews.code).json(reviews);
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const respondToUserReview = async (req, res) => {
  try {
    const {reviewId, response} = req.body;
    const user = await respondToReview(reviewId,response);

    if (user) {
      res.status(user.code).json(user);
    } else {
      res.status(user.code).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  getAllReviews,
  updateReview,
  deleteReview,
  flagInappropriateReview,
  getReviewStatistics,
  respondToUserReview
}