const {list,create,update,remove}=require("../../../../modules/Borrowing/borrowing.repo")


const addUserBorrowing = async (req, res) => {
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

const updateBorrowing = async (req, res) => {
  try {
    const targetBorrowingId = req.params.id;
    const updatedFields = req.body;
    const result = await update(targetBorrowingId, updatedFields);
    if (result.success ) {
      res.status(result.code).json(result.data);
    } else {
      res.status(result.code).json(result);
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


  module.exports={
   addUserBorrowing,
   getAllBorrowing,
   updateBorrowing,
   cancelBorrowing //delete
  }