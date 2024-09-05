const {create,update,remove,list,getReviews}=require("../../../../modules/Review/review.repo")
const {viewReviews}=require("../../../../modules/User/user.repo")
const {viewBookRatings}=require("../../../../modules/Book/book.repo")


const addReview = async (req, res) => {
  try {
    const result = await create(req.body);

    if (result.success) {
      res.status(result.code).json(result);
    } else {
      res.status(result.code).json(result);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


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


const viewOwnReviews = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await viewReviews(userId);

    if (user) {
      res.status(user.code).json(user);
    } else {
      res.status(user.code).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const getBookReviews = async (req, res) => {

  try {
    let bookId= req.params.id;
    const bookReviews = await getReviews(bookId);

    if (bookReviews) {
      res.status(bookReviews.code).json(bookReviews);
    } else {
      res.status(bookReviews.code).json(bookReviews);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
  viewOwnReviews, //does not handle api
  getBookReviews
  // viewBookRating
}