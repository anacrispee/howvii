const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { Router } = require('express');
const router = express.Router();
const imoveisController = require('../controller/imoveisController');
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

router.get('/', imoveisController.listaImoveis);

router.post('/', imoveisController.criaImovel);

router.put('/:putIdImovel', imoveisController.atualizaImovel);

router.delete('/:deleteIdImovel', imoveisController.deletaImovel);

module.exports = router;