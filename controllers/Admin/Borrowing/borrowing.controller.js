let {  list, getUserBorrowing } = require("../../../modules/Borrowing/borrowing.repo")


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


const getAllBorrowing = async (req, res) => {
    try {
      const borrowing = await list();
  
      if (borrowing) {
    
        res.status(borrowing.code).json(borrowing);
      } else {
        res.status(borrowing.code).json({ error: borrowing.error});
      }
    } catch (err) {
    
      res.status(500).json({ error: "Unexpected error!" });
    }
  };

  
module.exports={
    getAllBorrowingBooksOfUser,
    getAllBorrowing,
}