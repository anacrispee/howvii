const express = require('express');
const router = require.Router();
const {PrismaCliente} = require('@prisma/client');
const prisma = new PrismaClient();
const imoveisController = require('..imoveisController/controller/');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', vendasController.listaVendas);

router.post('/', vendasController.criaVenda);

router.put('/:putIdVenda', vendasController.atualizaVenda);

router.delete('/:deleteIdVenda', vendasController.deletaVenda);

module.exports = router;