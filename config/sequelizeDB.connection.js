const sequelize=require('sequelize')

const connection=new sequelize('db','root','',{
    host:'localhost',
    dialect:'mysql',
    logging: console.log


})

module.exports=connection