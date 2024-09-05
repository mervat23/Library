let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let Borrowing = connection.define('Borrowing', {
  borrowed: {
    type: sequelize.STRING,
    allowNull: false,
    defaultValue: false  
  },

  borrowedAt: {
    type: sequelize.DATE,
    allowNull: true
  },

  returnedAt: {
    type: sequelize.DATE,
    allowNull: true
  },
 
  status: {
    type: sequelize.STRING,
    allowNull: true
  },

  bookId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  
  userId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  
});


module.exports = Borrowing;
