// importando o express (instalado via terminal)
import express from 'express';
import {ler} from './src/aluno.js';

const app = express();
const porta  = 3000;

// habilitando o express para trabalhar com o formato JSON
app.use(express.json());


// habilitando o express para trabalhar com o formato URL Encoded (formulário).
app.use(express.urlencoded({extended : true}));



/* ROTAS */
//configurando rota para inicio da aplicação
app.get('/', function(req, res){
    res.send(`API de alunos com nodeJS, express e MySQL.`);
        
}); 

// Rota para visualizar todos os alunos
app.get('/alunos', (req, res) => {
     // res.send(`Dados de todos os alunos da sala`);
     ler(res);
});

// Rota/ Endpoint visualizar UM aluno
app.get('/alunos/:id', (req, res) => {
    res.send(`Dados de um aluno qualquer`)
});


app.post('/alunos', (req,res) => {
   res.send('Cadastrando um aluno.')
});



// Endpoint para atualizar todos os dados de um aluno.
app.put('/alunos/:id',(req,res) =>{
    res.send('Atualizando um  aluno')
});

// Endpoint para atualizar alguns dados de um aluno.
app.patch('/alunos/:id', (req, res) =>{
    res.send('Atulizar alguns dados de um aluno!')
});

// Endpoint para deletar um aluno.
app.delete('/alunos/:id', (req, res) =>{
    res.send('Deletar um aluno!')
});

/* SERVIDOR */
app.listen(porta, () => {
     console.log(`Servidor ouvindo na porta ${porta}`);

})


