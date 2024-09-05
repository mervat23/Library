const sequelize=require('./sequelizeDB.connection')

let createTables=()=>{
    sequelize.sync().then(()=>{
     console.log('connected using sequelize to database server ')
    }).catch(err=>console.log(err))
}

module.exports=createTables