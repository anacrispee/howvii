const express = require('express');
const router = require.Router();
const {PrismaCliente} = require('@prisma/client');
const prisma = new PrismaClient();
const imoveisController = require('..imoveisController/controller/');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', pagamentosControllerController.listaPagamentos);

router.post('/', pagamentosController.criaPagamento);

router.put('/:putIdVenda', pagamentosController.atualizaIPagamento);

router.delete('/:deleteIdPagamento', pagamentosController.deletaPagamento);

module.exports = router;