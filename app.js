// importando o express (instalado via terminal)
import express from 'express'
const app = express();
const porta  = 3000;

/* ROTAS */
//configurando rota para inicio da aplicação
app.get('/', function(req, res){
    res.send(`Boas vindas à nossa página inicial`);
        
}); 

// Criando uma ROTA sobre
app.get('/sobre', function(req,res){
res.send(`Sobre da página`)
})



/* SERVIDOR */
app.listen(porta, () => {
     console.log(`Servidor ouvindo na porta ${porta}`);

})


