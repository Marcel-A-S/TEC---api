// importando o express (instalado via terminal)
import express from 'express';
import cors from 'cors';
import {ler, inserir, lerUM, atualizar, excluir} from './src/aluno.js';

const app = express();
const porta  = process.env.PORT || 3000;

// habilitando o express para trabalhar com o formato JSON
app.use(express.json());


// habilitando o express para trabalhar com o formato URL Encoded (formulário).
app.use(express.urlencoded({extended : true}));

// habilitando CORS
app.use(cors());



/* ROTAS */
//configurando rota para inicio da aplicação
app.get('/', function(req, res){
   // res.send(`API de alunos com nodeJS, express e MySQL.`);
   res.redirect('https://marcel-a-s-2210779.postman.co/documentation/59142795-a090d9dc-46c4-411e-9387-c264131335e7/publish?workspaceId=fc49ef7d-72f0-45a5-81be-78347a569f3c&authFlowId=65961f0b-0244-428a-b0d6-98d7a4641666&_pmt=pmMTc5MDI1MDI3MjgzMQ%253D%253D%257CPM.MjAyNi0wOS0yNFQxMTo0NDozMi44MzFa');

        
}); 

// Rota para visualizar todos os alunos
app.get('/alunos', (req, res) => {
     // res.send(`Dados de todos os alunos da sala`);
     ler(res);
});

// Rota/ Endpoint visualizar UM aluno
app.get('/alunos/:id', (req, res) => {
    // res.send(`Dados  um aluno `);

    // requisição do parâmetro ID
    const id = parseInt(req.params.id);
    lerUM(id, res);
});


app.post('/alunos', (req,res) => {
   //res.send('Cadastrando um aluno.')

   // capturando os dados a partir do corpo da requisição
   const novoAluno = req.body;
   inserir(novoAluno, res);
});



// Endpoint para atualizar todos os dados de um aluno.
app.put('/alunos/:id',(req,res) =>{
    res.send('Atualizando um  aluno')
});

// Endpoint para atualizar alguns dados de um aluno.
app.patch('/alunos/:id', (req, res) =>{
    // res.send('Atulizar alguns dados de um aluno!')

    const id = parseInt(req.params.id);
    const aluno = req.body;
    atualizar(id, aluno,res);



});

//  Deletar um aluno.
app.delete('/alunos/:id', (req, res) =>{
    // res.send('Deletar um aluno!')
    const id = parseInt(req.params.id);
    excluir(id,res);
});

/* SERVIDOR */
app.listen(porta, () => {
     console.log(`Servidor ouvindo na porta ${porta}`);

})


