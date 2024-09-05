const {get,viewBooks,viewReviews}=require("../../../../modules/User/user.repo")
const {getUserBorrowing}=require("../../../../modules/Borrowing/borrowing.repo")
const {getReviews}=require("../../../../modules/Review/review.repo")


const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await get({id} );

    if (user) {
      res.status(user.code).json(user);
    } else {
      res.status(user.code).json({ error:user.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const viewAvailableBooks = async (req, res) => {

  try {
    const books = await viewBooks();

    if (books) {
  
      res.status(books.code).json(books);
    } else {
      res.status(books.code).json(books);
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const getAllBorrowingBooksOfUser= async (req, res) => {
  try {
    let id= req.query.id;
    const borrowing = await getUserBorrowing(id);

    if (borrowing) {
      res.status(borrowing.code).json(borrowing);       
    } else {
      res.status(borrowing.code).json({ error:borrowing.error});
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

const getOwnReviews = async (req, res) => {

  try {
    let userId= req.params.id;
    const ownReviews = await viewReviews(userId);

    if (ownReviews) {
      res.status(ownReviews.code).json(ownReviews);
    } else {
      res.status(ownReviews.code).json(ownReviews);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};



module.exports={
  getUserById,
  getBookReviews, 
  viewAvailableBooks, 
  getAllBorrowingBooksOfUser, 
  getOwnReviews
}