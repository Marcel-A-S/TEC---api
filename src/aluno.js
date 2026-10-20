 // importando a conexão com o banco de dados
import conexao from "./banco.js"; 

// Função ler: vai ler os alunos do banco de dados 
// Nesse  (momento inicial não temos nenhum);
function ler(res){
    const sql = "SELECT * FROM alunos ORDER BY nome";

    conexao.query(sql, (erro, resultados)=> {

    })
}
