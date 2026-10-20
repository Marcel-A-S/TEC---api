 // importando a conexão com o banco de dados
import conexao from "./banco.js"; 

// Função ler: vai ler os alunos do banco de dados 
// Nesse  (momento inicial não temos nenhum);
function ler(res){
    const sql = "SELECT * FROM alunos ORDER BY nome";

    conexao.query(sql, (erro, resultados)=> {
        // verificando se a erro, em caso positivo e define o status para 
        // 400 (band request)  e apresenta o código do erro no formato json.
      if(erro){
        res.status(400).json(erro.code);
        return;
      }

      // verifica se tem registro no banco de dados, caso não tenha define
      //  o status para 204 (sem conteudo).
      if(resultados === 0){
        res.status(204).end();
        return;
      }
      // define o status como 200 (ok) e exibe os resultados.
      res.status(200).json(resultados);

    })
}

// INSERINDO alunos no banco de dados
function inserir(aluno, res){
       const sql = "INSERT INTO alunos SET ?"; // O Mysql2 com o "SET" faz com que 
       //  o mysql entenda que todos os dados recebidos serão atribuidos na ordem enviada
       // aos campos da tabela alunos.
       
       conexao.query(sql, aluno, (erro)=>{
           if(erro){
            res.status(400).json(erro.code);
           }else {
            res.status(201).json({"status" : "aluno inserido"}) //além de responder com o status
            // 201, adicionamos uma mensagem amigavel para conferir que o usuário foi inserido no banco de dados.                          
           }
       })
}                                              


export { ler };