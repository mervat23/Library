let{get,getBooks,update,remove,search}=require("../../../../modules/Author/author.repo")


const getAuthorById = async (req, res) => {
  try {
    let id = req.params.id;
    const author = await get({id});

    if (author) {
      res.status(author.code).json(author);
    } else {
      res.status(author.code).json({ error:author.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const getAuthorBooks = async (req, res) => {
  try {
    let authorId = req.params.id;
    const author = await getBooks(authorId);

    if (author) {
      res.status(author.code).json(author.data);
    } else {
      res.status(author.code).json(author);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const updateAuthor= async (req, res) => {
  try {
    const targetAuthorId = req.params.id;
    const updatedFields = req.body;

    const result = await update(targetAuthorId,updatedFields);

    if (result) {
      res.status(result.code).json(result);
    } else {
      res.status(result.code).json({ error: result.error });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const deleteAuthor = async (req, res) => {
  try {
    const targetAuthorId = req.params.id;
    const deletedCount = await remove(targetAuthorId);

    if (deletedCount) {
      res.status(deletedCount.code).json(deletedCount);
    } else {
      res.status(deletedCount.code).json({error:deletedCount.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const searchAuthors = async (req, res) => {
  try {
    const query = req.query;
    const authors = await search(query);
     
    if (authors) {
      res.status(authors.code).json(authors);
    } else {
      res.status(authors.code).json(authors);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  getAuthorById,
  getAuthorBooks,
  updateAuthor,
  deleteAuthor,
  searchAuthors
}