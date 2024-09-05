let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let Review = connection.define('Review', {

    reviewText: {
        type: sequelize.TEXT,
        allowNull: false
    },
    rating: {
        type: sequelize.FLOAT,
        allowNull: false
    },
   
    date: {
        type: sequelize.DATE,
        allowNull: false
    },

    isFlagged: { //if review is bad make flaged to true
        type: sequelize.STRING,
        defaultValue: false, // Default value is false
      },
      response:{
        type: sequelize.TEXT,
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



module.exports = Review;
