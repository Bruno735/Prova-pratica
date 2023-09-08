const express = require('express')
const exphbs = require('express-handlebars')
const mysql2 = require('mysql2')
const PORT = 3333
//Importar o módulo conn para as operações com o banco

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//Middleware para arquivos estáticos


app.get('/', (request, response)=>{
  return response.render('home')
})

app.listen(PORT, ()=>{
  console.log(`Servidor rodando na porta ${PORT}`)
})

const connection = mysql2.createConnection( {
  host: "localhost",
  user: "aluno_medio",
  password: "@lunoSenai23.",
  database: "livros",
});


app.post("/cadastrar", (request, respose) =>{
    const {titulo, categoria, descricao, preco, quantidade} = request.body

    const inserirMysql = `INSERT INTO livro(titulo, categoria, descricao, preco, qauntiade) VALUE ('${titulo}', '${categoria}', '${descricao}', '${preco}', '${quantidade}')`

    connection.query(inserirMysql, (error) =>{
        if(error){
            console.log(error)
            return response.status(500).json({error:"Error ao inserir informaçoes no servidor"})
        }

        return response.redirect('./')
    })
})

