let {  list, get ,search,getBooks,monitorBook} = require("../../../../modules/Book/book.repo")


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


const viewAvailableBooks = async (req, res) => {
  try {
    const books = await getBooks();

    if (books) {
  
      res.status(books.code).json(books);
    } else {
      res.status(books.code).json({ error: books.error});
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

const monitorBookStatus = async (req, res) => {
  try {
    let bookId= req.params.id;
    const book = await monitorBook(bookId);

    if (book) {
      res.status(book.code).json(book);
    } else {
      res.status(book.code).json(book);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

module.exports={
  getUserBookId,
  getAllBooks,
  viewAvailableBooks,
  searchBooks,
  monitorBookStatus
}