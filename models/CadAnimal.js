const db = require('./db')

const CadAnimal = db.sequelize.define('animais', {
    nome: {
        type: db.Sequelize.TEXT
    },
    especie:{
        type: db.Sequelize.TEXT
    }, 
    raca:{
        type: db.Sequelize.TEXT
    },
    sexo:{
        type: db.Sequelize.TEXT
    },
  
   
 
 
 
 
 
});
module.exports = CadAnimal;


//CadAnimal.sync({force: true})