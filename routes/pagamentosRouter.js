const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const imoveisController = require('../controller/imoveisController');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', pagamentosController.listaPagamentos);

router.post('/', pagamentosController.criaPagamento);

router.put('/:putIdVenda', pagamentosController.atualizaPagamento);

router.delete('/:deleteIdPagamento', pagamentosController.deletaPagamento);

module.exports = router;