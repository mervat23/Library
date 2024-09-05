let {  list, get ,update,remove} = require("../../../modules/Publisher/publisher.repo")

const getAllPublishers = async (req, res) => {
  try {
    const publishers = await list();

    if (publishers) {
  
      res.status(publishers.code).json(publishers);
    } else {
      res.status(publishers.code).json({ error: publishers.error});
    }
  } catch (err) {
  
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const getPublisherById = async (req, res) => {
  try {
    let id = req.query.id;
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


const deletePublisher= async (req, res) => {
  try {
    const targetPublisherId = req.params.id;
    const deletedCount = await remove(targetPublisherId);

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
 getAllPublishers,
 getPublisherById,
 updatePublisher,
 deletePublisher
}