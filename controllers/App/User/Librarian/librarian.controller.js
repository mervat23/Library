const {get,remove}=require("../../../../modules/User/user.repo")


const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await get({id} );

    if (user) {
      res.status(user.code).json(user);
    } else {
      res.status(user.code).json({ error:user.error});
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error!" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const deletedCount = await remove(targetUserId);

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
  getUserById,
  deleteUser
}