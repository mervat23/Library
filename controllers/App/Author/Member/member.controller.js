let{get,search,getBooks}=require("../../../../modules/Author/author.repo")


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


// exports.getAllAuthorsOfMyBooks = async (req, res) => {

//     try {
//       const authors = await list();
  
//       if (authors) {
    
//         res.status(authors.code).json(authors);
//       } else {
//         res.status(authors.code).json({ error: authors.error});
//       }
//     } catch (err) {
    
//       res.status(500).json({ error: "Unexpected error!" });
//     }
// };


module.exports={
  getAuthorById,
  getAuthorBooks,
  searchAuthors
}