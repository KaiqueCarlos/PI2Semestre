const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
const CadAnimal = require("./models/CadAnimal");
//const session = require('express-session');


//template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main', runtimeOptions:{allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true,} }));
app.set('view engine', 'handlebars');


// Middleware para analisar dados JSON
app.use(bodyParser.json());
// Middleware para analisar dados de formulário (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Seção de usuário
//app.use(session({ secret: 'hghjhhjhk' }));

// Rotas para a página de login
app.get('/', (req, res) => {
  res.render('login');
});
app.post('/paginainicial', (req, res) => {
  res.render('pagina_inicial');
});


// Rota para a página inicial (acessar apenas após realizar login)
app.get('/paginainicial', (req, res) => {
  res.render('pagina_inicial');
});

// Rota para cadastrar novo usuário (página de login)
app.post('/add', function (req, res) {
  Post.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    email: req.body.email,
    senha: req.body.senha,
    cidade: req.body.cidade,
    telefone: req.body.telefone
  })
  res.render('login')
});


let arrayDeAnimais = [];

app.post('/addAnimal', function (req, res) {
  // Crie um objeto com os dados do animal a ser adicionado
  let novoAnimal = {
    nome: req.body.nome,
    especie: req.body.especie,
    raca: req.body.raca,
    sexo: req.body.sexo,
    idade: req.body.idade
  };

  // Adicione o novo animal ao array
  arrayDeAnimais.push(novoAnimal);

  // Agora, você pode fazer o CadAnimal.create se necessário
  CadAnimal.create({
    nome: req.body.nome,
    especie: req.body.especie,
    raca: req.body.raca,
    sexo: req.body.sexo,
    idade: req.body.idade
  });

  // Outras ações ou respostas podem ser adicionadas conforme necessário
 res.redirect('/paginainicial');
 console.log(arrayDeAnimais);
});



// Exemplo de como acessar o array de animais em outra parte do código
//app.get('/listarAnimais', function (req, res) {
  //res.json(arrayDeAnimais);
//});



app.get('/cad', function(req, res){
  CadAnimal.findAll().then(function(most){
    res.render('home',{most: most});
  });
});

app.get('/deletar/:id', function(req, res){
  CadAnimal.destroy({where: {'id': req.params.id}}).then(function(){
    res.redirect('/paginainicial')
  }).catch(function(erro){
    res.send("Essa postagem não existe")
  })
})


app.post('/alterar/:id', function(req, res){
  CadAnimal.update(
    {
      nome: req.body.nome,
      especie: req.body.especie,
      raca: req.body.raca,
      sexo: req.body.sexo
    },
    {
      where: {
        'id': req.params.id
      }
    }
)
  .then(() => {
    res.redirect('/paginainicial'); // ou outra rota para redirecionar após a atualização
  })
  .catch((error) => {
    console.error('Erro ao atualizar registro:', error);
    res.status(500).send('Erro interno do servidor.');
  });
})




// Porta para acessar o página utilizando um servidor local
app.listen(2000, function () {
  console.log("Servidor rodando http://localhost:2000 ");
});