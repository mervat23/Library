let {  list, get ,update,remove} = require("../../../modules/User/user.repo")

const getAllUsers = async (req, res) => {
    try {
      const users = await list();
  
      if (users) {
    
        res.status(users.code).json(users);
      } else {
        res.status(users.code).json({ error: users.error});
      }
    } catch (err) {
    
      res.status(500).json({ error: "Unexpected error!" });
    }
};


const getUserById = async (req, res) => {

    try {
      const id = req.query.id;
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
  

// const upgradeRole = async (req, res) => {
//     let { role } = req.body
//     const result = await update(req.params.id, {role: role})
//     if (result.success) {
//         res.status(result.code).json({ massage: "Sucsses!", user: result.record })
//     }
//     else {
//         res.status(result.code).json({ massage: "Error!", error: result.error })
//     }
// }

module.exports={
  getAllUsers,
  getUserById,
  deleteUser,
//   upgradeRole  
}