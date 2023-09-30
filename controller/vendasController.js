const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const imoveisController = require('../controller/imoveisController');
const pagamentosController = require('../controller/pagamentosController');

async function listaVendas(req, res) {
    try{
        const vendas = await prisma.vendas.findMany();
        return res.status(200).json(vendas);
    }catch(error){
        return res.status(404).json({message: "Erro ao listar vendas!"});
    }
};

async function totalVendasPorPeriodo(req, res) {
    try{
        const vendasPorMesAno = await prisma.vendas.groupBy({
            by: {
                mesAno: { month: true, year: true}
            },
            _sum: {
                valorPagamento: true
            }
        });

        const resultado = vendasPorMesAno.map((item) => {
            const { mesAno, _sum } = item;
            const mes = mesAno.getMonth() + 1;
            const ano = mesAno.getFullYear();
            const chave = `${mes}/${ano}`;
            const totalVendas = _sum.valorPagamento;
            return { [chave]: totalVendas };
        })

        return resultado;
    }catch(error){
        return res.status(404).json({message: "Erro ao listar vendas por período."});
    }
}

async function percentualVendasPorImovel(req, res) {
    try {
      const imoveis = await prisma.imovel.findMany();
      const totalVendas = await prisma.venda.aggregate({
        _sum: {
          valorPagamento: true
        }
      });
  
      const totalVendasValor = totalVendas._sum.valorPagamento;
      const resultado = imoveis.map((imovel) => {
        const { tipoImovel, valorImovel } = imovel;
        const percentualVendas = (valorImovel / totalVendasValor) * 100;
        return { [tipoImovel]: `${percentualVendas.toFixed(2)}%` };
      });
      return resultado;
    } catch (error) {
      console.error('Erro ao listar percentual de vendas por tipo de imóvel.');
    }
};

async function criaVenda (req, res) {
    const {postDataVenda} = req.body;
    const {postValorPagamento} = req.body;
    const {idImovel} = req.params;

    try{
        const novaVenda = await prisma.venda.create({
            data: {
                dataVenda: postDataVenda,
                valorPagamento: postValorPagamento,
                idImovel: idImovel,
            },
        });
        return res.status(201).json({message: "Venda inserida com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao inserir venda."})
    }
};

async function atualizaVenda (req, res) {
    const {putDataVenda} = req.body;
    const {putValorPagamento} = req.body;
    const {idVenda} = req.params;
    const {idImovel} = req.params;

    try{
        const atualizaVenda = await prisma.venda.update({
            where: { idVenda: Number(putIdVenda)},
            data: { dataVenda: putDataVenda,
                    valorPagamento: putValorPagamento,
                },
        });
        return res.status(200).json({message: "Venda atualizada com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao atualizar venda."})
    }

};

async function deletaVenda (req, res) {
    const {deleteIdVenda} = req.params;

    try{

            prisma.venda.delete({
                where: {
                    idVenda: Number(deleteIdVenda),
                },
            })

            return res.status(204).json({message: "Venda deletado com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao deletar venda."})
    }

};

module.exports = {
    listaVendas,
    totalVendasPorPeriodo,
    percentualVendasPorImovel,
    criaVenda,
    atualizaVenda,
    deletaVenda,
}