const Sequelize = require('sequelize');
const sequelize = new Sequelize('pisegundo', 'root', 'kainan1!', {

    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate()
.then(function(){
    console.log("Conectado com sucesso ao banco de dados.");

}).catch(function(){
    console.log("Erro na conexão com o banco de dados.");

});

module.exports = {
    
    Sequelize: Sequelize,
    sequelize: sequelize
   
};  