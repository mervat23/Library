const {get,search,getBooks}=require("../../../../modules/Publisher/publisher.repo")

const getPublisherById = async (req, res) => {
  try {
    let id = req.params.id;
    const publisher = await get({id});

    if (publisher) {
      res.status(publisher.code).json(publisher);
    } else {
      res.status(publisher.code).json({ error:publisher.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const searchPublishers = async (req, res) => {
  try {
    const query = req.query;
    const publishers = await search(query);
     
    if (publishers) {
      res.status(publishers.code).json(publishers);
    } else {
      res.status(publishers.code).json(publishers);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const getPublisherBooks = async (req, res) => {
  try {
    const publisherId=req.params.id
    const publishers = await getBooks(publisherId);

    if (publishers) {
  
      res.status(publishers.code).json(publishers);
    } else {
      res.status(publishers.code).json(publishers.error);
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};


module.exports={
  getPublisherById,
  searchPublishers,
  getPublisherBooks,
}
  