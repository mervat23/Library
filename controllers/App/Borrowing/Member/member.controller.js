const {getUserBorrowing,viewBorrowing,remove}=require("../../../../modules/Borrowing/borrowing.repo")
const {requestBookBorrowing}=require("../../../../modules/User/user.repo")

const getAllBorrowingBooksOfUser= async (req, res) => {
  try {
    let id= req.params.id;
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

const cancelBorrowing= async (req, res) => {
  try {
    const targetBorrowingId = req.params.id;
    const deletedCount = await remove(targetBorrowingId);

    if (deletedCount) {
      res.status(deletedCount.code).json(deletedCount);
    } else {
      res.status(deletedCount.code).json({error:deletedCount.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const viewBorrowingStatus= async (req, res) => {
  try {
    let bookId= req.params.id;
    const borrowing = await viewBorrowing(bookId);

    if (borrowing) {
      res.status(borrowing.code).json(borrowing);       
    } else {
      res.status(borrowing.code).json(borrowing);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  getAllBorrowingBooksOfUser,
  cancelBorrowing,
  viewBorrowingStatus,
}