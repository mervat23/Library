let {  list, get } = require("../../../modules/Review/review.repo")


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

const getReviewById = async (req, res) => {
    try {
      let id = req.query.id;
      const review = await get(id);
  
      if (review) {
        res.status(review.code).json(review);
      } else {
        res.status(review.code).json({ error:review.error});
      }
    } catch (err) {
      res.status(500).json({ error: "Unexpected error!" });
    }
};


module.exports={
    getAllReviews,
    getReviewById
}