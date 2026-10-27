
const API = '/alunos';

const form = document.getElementById('formAluno');
const lista = document.getElementById('listaAlunos');
const mensagem = document.getElementById('mensagem');

// LISTAR TODOS OS ALUNOS
async function listarAlunos() {
    try {
        const resposta = await fetch(API);

        if (!resposta.ok) {
            throw new Error('Erro ao buscar alunos.');
        }

        const alunos = await resposta.json();

        lista.replaceChildren();

        alunos.forEach(aluno => {
            const linha = document.createElement('tr');

            const valores = [
                aluno.id,
                aluno.nome,
                aluno.email
            ];

            valores.forEach(valor => {
                const coluna = document.createElement('td');
                coluna.textContent = valor ?? '';
                linha.appendChild(coluna);
            });

            const colunaAcoes = document.createElement('td');
            const botaoExcluir = document.createElement('button');

            botaoExcluir.textContent = 'Excluir';
            botaoExcluir.className = 'excluir';

            botaoExcluir.addEventListener('click', () => {
                excluirAluno(aluno.id);
            });

            colunaAcoes.appendChild(botaoExcluir);
            linha.appendChild(colunaAcoes);
            lista.appendChild(linha);
        });

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

// CADASTRAR ALUNO
form.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    const aluno = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value
    };

    try {
        const resposta = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível cadastrar o aluno.');
        }

        mensagem.textContent = 'Aluno cadastrado com sucesso!';
        form.reset();

        await listarAlunos();

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

// EXCLUIR ALUNO
async function excluirAluno(id) {
    if (!confirm('Deseja realmente excluir este aluno?')) {
        return;
    }

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });

        if (!resposta.ok) {
            throw new Error('Não foi possível excluir o aluno.');
        }

        mensagem.textContent = 'Aluno excluído com sucesso!';

        await listarAlunos();

    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

// BOTÃO PARA ATUALIZAR A LISTA
document.getElementById('btnAtualizar')
    .addEventListener('click', listarAlunos);

// CARREGAR A LISTA QUANDO ABRIR A PÁGINA
listarAlunos();
