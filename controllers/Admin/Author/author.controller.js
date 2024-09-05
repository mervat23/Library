let {  list, get,update,remove} = require("../../../modules/Author/author.repo")


const getAllAuthors = async (req, res) => {
  try {
    const authors = await list();

    if (authors) {
  
      res.status(authors.code).json(authors);
    } else {
      res.status(authors.code).json({ error: authors.error});
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};

const getAuthorById = async (req, res) => {
  try {
    let id = req.query.id;
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



module.exports={
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
}
