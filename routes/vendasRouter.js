const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const imoveisController = require('../controller/imoveisController');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', vendasController.listaVendas);

router.post('/', vendasController.criaVenda);

router.put('/:putIdVenda', vendasController.atualizaVenda);

router.delete('/:deleteIdVenda', vendasController.deletaVenda);

module.exports = router;