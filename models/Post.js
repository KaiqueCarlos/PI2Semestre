const db = require('./db')

const Post = db.sequelize.define('clientes', {
    nome: {
        type: db.Sequelize.TEXT
    },
    sobrenome: {
        type: db.Sequelize.TEXT
    },
    email: {
        type: db.Sequelize.TEXT
    },
    senha: {
        type: db.Sequelize.TEXT
    },
    cidade:{
        type: db.Sequelize.TEXT
    },
    telefone:{
        type: db.Sequelize.TEXT
    }
});

module.exports = Post;

//Post.sync({force: true})