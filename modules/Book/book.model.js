let connection=require('../../config/sequelizeDB.connection')
let sequelize=require('sequelize')


let Book=connection.define('Book',{
    isbn: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
      }, 
     title:{
          type:sequelize.STRING,
          allowNull: false
     },
     description:{
        type:sequelize.STRING,
         allowNull: false
     },
     Availability:{
          type:sequelize.STRING,
          allowNull: false

     },
    
     genre:{
          type:sequelize.STRING,
          allowNull: false
     },
     publicationYear: {
    type: sequelize.INTEGER, 
    allowNull: false,
     },
     
     status: {
          type: sequelize.ENUM('available', 'borrowed', 'lost', 'damaged'), // Define the status values
          defaultValue: 'available', // Default status when creating a new book
          allowNull: false,
        },

        averageRating: {
          type: sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.0

      },
      authorId: {
          type: sequelize.INTEGER,
          allowNull: false,
        },
        publisherId: {
          type: sequelize.INTEGER,
          allowNull: false,
        },
     
})


module.exports=Book