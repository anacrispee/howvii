const express = require('express');
const router = require.Router();
const {PrismaCliente} = require('@prisma/client');
const prisma = new PrismaClient();
const imoveisController = require('..imoveisController/controller/');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', imoveisController.listaImoveis);

router.post('/', imoveisController.criaImovel);

router.put('/:putIdImovel', imoveisController.atualizaImovel);

router.delete('/:deleteIdImovel', imoveisController.deletaImovel);

module.exports = router;