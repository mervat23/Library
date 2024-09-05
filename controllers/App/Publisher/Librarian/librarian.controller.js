const {get,update,search}=require("../../../../modules/Publisher/publisher.repo")



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


const updatePublisher= async (req, res) => {
  try {
    const targetPublisherId = req.params.id;
    const updatedFields = req.body;

    const result = await update(targetPublisherId,updatedFields);

    if (result) {
      res.status(result.code).json(result);
    } else {
      res.status(result.code).json({ error: result.error });
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


module.exports={
  getPublisherById,
  updatePublisher,
  searchPublishers,
}