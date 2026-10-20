import mysql2 from 'mysql2';

const conexao = mysql2.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'senacpenha',
    database : 'escola-api'
});

// cocexao.connect();

conexao.connect( erro => {
    if(erro){
        console.erro(`Erro ao conectar: ${erro.message}`); // Exibir mensagem de erro amigavel.
    } else{
        console.log('Banco de dados conectado com sucesso!');
    }
});

// exportando a conexão com o banco de dados
export default conexao;