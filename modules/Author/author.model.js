let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let Author = connection.define('Author', {
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
    Nationality: {
      type: sequelize.STRING,
      allowNull: false
    },
    biography: {
      type: sequelize.TEXT,
      allowNull: true
    }
  }, 
    {

      hooks: {
        beforeCreate: async (author) => {
          let bcrypt = require('bcrypt');
          const saltRounds = 10;
          author.password = await bcrypt.hash(author.password, saltRounds);
        }
      }
  });

  


module.exports=Author