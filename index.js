const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


// Config
    // Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    // Body Parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas
    app.get('/', (req, res) => {
        Post.findAll({order: [['id', 'DESC']]})
        .then(posts => {
            res.render('home', {posts: posts})
        })
    })

    app.get('/add', (req, res) => {
        res.render('form')
    })

    app.post('/add', (req, res) => {
        Post.create({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
        }).then(() => {
            res.redirect('/')
        }).catch((error) => {
            res.send('Houve um erro: ', error)
        })
    })

    app.get('/delete/:id', (req, res) => {
        Post.destroy({where: {id: req.params.id}})
        .then(() => {
            res.redirect('/')
        }).catch(error => {
            res.send('Esta postagem não existe')
        })
    })

app.listen(8081, () => {
    console.log('servidor rodando...')
})
