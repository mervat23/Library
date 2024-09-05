let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let Publisher = connection.define('Publisher', {
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
      },
      password: {
        type: sequelize.STRING,
        allowNull: false
      },
    location: {
      type: sequelize.STRING,
      allowNull: true
    }
  }, 
  {

    hooks: {
      beforeCreate: async (publisher) => {
        let bcrypt = require('bcrypt');
        const saltRounds = 10;
        publisher.password = await bcrypt.hash(publisher.password, saltRounds);
      }
    }
});

  
module.exports = Publisher;
