// importando a conexão com o banco de dados
import conexao from "./banco.js";

// Função ler: vai ler os alunos do banco de dados 
// Nesse  (momento inicial não temos nenhum);
function ler(res) {
    const sql = "SELECT * FROM alunos ORDER BY nome";

    conexao.query(sql, (erro, resultados) => {
        // verificando se a erro, em caso positivo e define o status para 
        // 400 (band request)  e apresenta o código do erro no formato json.
        if (erro) {
            res.status(400).json(erro.code);
            return;
        }

        // verifica se tem registro no banco de dados, caso não tenha define
        //  o status para 204 (sem conteudo).
        if (resultados === 0) {
            res.status(204).end();
            return;
        }
        // define o status como 200 (ok) e exibe os resultados.
        res.status(200).json(resultados);

    })
}

// INSERINDO alunos no banco de dados
function inserir(aluno, res) {
    const sql = "INSERT INTO alunos SET ?"; // O Mysql2 com o "SET" faz com que 
    //  o mysql entenda que todos os dados recebidos serão atribuidos na ordem enviada
    // aos campos da tabela alunos.

    conexao.query(sql, aluno, (erro) => {
        if (erro) {
            res.status(400).json(erro.code);
        } else {
            res.status(201).json({ "status": "aluno inserido" }) //além de responder com o status
            // 201, adicionamos uma mensagem amigavel para conferir que o usuário foi inserido no banco de dados.                          
        }
    })
}

// Exibindo UM aluno
function lerUM(id, res) {
    const sql = "SELECT * FROM alunos WHERE id= ?";

    conexao.query(sql, id, (erro, resultado) => {
        if (resultado.length === 0) {
            res.status(204).res.end();
            return;
        }

        if (erro) {
            res.status(400).jsoin(erro.code);
        } else {
            res.status(200).json(resultado[0]);
        }
    })
}


     // Atualizar dados do aluno
function atualizar(id, aluno, res) {
    const sql = "UPDATE alunos SET ? WHERE id = ?";
    
    // Como estamos pasando 2 parâmetros - pela 1ªvez - precisa ser dentro de uma
    // array. Aordem importa precisamos respeitar a ordem da linha sql acima.
    conexao.query(sql, [aluno,id], (erro, resultados) =>{
        if(erro){
            res.status(400).json(erro.code);

        }else {
            res.status(200).json({"status" : "alunos atualizado com sucesso"});
        }

    });
}


  // Deletando um aluno
  function excluir(id,res){
      const sql = "DELETE FROM alunos WHERE id = ?";
      conexao.query(sql, id, (erro, resultados) => {
        if(erro){
            res.status(400).json(erro.code);
        } else {
            res.status(200).json({"status": "estudante excluido com sucesso", id});

        }
      })
  }

export { ler, inserir, lerUM, atualizar, excluir };