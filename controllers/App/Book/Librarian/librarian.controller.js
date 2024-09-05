let {  list, get ,create,update,remove,search} = require("../../../../modules/Book/book.repo")


const getUserBookId = async (req, res) => {
  try {
    let id = req.params.id;
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


const addBook = async (req, res) => {
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


const updateBook = async (req, res) => {
  try {
    const targetBookId = req.params.id;
    const updatedFields = req.body;
    const result = await update(targetBookId, updatedFields);
    if (result ) {
      res.status(result.code).json(result);
    } else {
      res.status(result.code).json({ error: result.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const deleteBook = async (req, res) => {
  try {
    const targetBookId = req.params.id;
    const deletedCount = await remove(targetBookId );

    if (deletedCount) {
      res.status(deletedCount.code).json(deletedCount);
    } else {
      res.status(deletedCount.code).json({error:deletedCount.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const searchBooks= async (req, res) => {
  try {
    const searchTerm  = req.query.title || req.query.authorId ;
    
    const books = await search(searchTerm);
     
    if (books) {
      res.status(books.code).json(books);
    } else {
      res.status(books.code).json(books);
    }

  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  getUserBookId,
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  searchBooks
}