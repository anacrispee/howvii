const express = require('express');
const app = express();
const port = 3000;
const {PrismaClient} = require('PrismaClient');
const prisma = new PrismaClient();

app.use(express.json());

//Rotas:
app.use('/imoveis', require('./routes/imoveisRouter'));
app.use('/vendas', require('./routes/vendasRouter'));
app.use('/pagamentos', require('./routes/pagamentosRouter'));
app.use(express.static('./view'));