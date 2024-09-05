let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let User=connection.define('User', {
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
    // unique: true
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: sequelize.STRING,
    allowNull: false
  },
  address: {
    type: sequelize.STRING,
    allowNull: false
  },

  role: {
    type: sequelize.ENUM('admin', 'librarian', 'member'),
    defaultValue: 'member'
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      let bcrypt = require('bcrypt');
      const saltRounds = 10;
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  }

});



module.exports = User;
