let {  list, get } = require("../../../modules/Book/book.repo")

const getAllBooks = async (req, res) => {
    try {
      const books = await list();
  
      if (books) {
    
        res.status(books.code).json(books);
      } else {
        res.status(books.code).json({ error: books.error});
      }
    } catch (err) {
    
      res.status(500).json({ error: "Unexpected error!" });
    }
};

const getUserBookId = async (req, res) => {
    try {
      let id = req.query.id;
      const book = await get({ where: { id} });
  
      if (book) {
        res.status(book.code).json(book);
      } else {
        res.status(book.code).json({ error:book.error});
      }
    } catch (err) {
      res.status(500).json({ error: "Unexpected error!" });
    }
  };
  
module.exports={
    getAllBooks,
    getUserBookId
}