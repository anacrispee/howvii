const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const vendasController = require('../controller/vendasController');

async function listaVendas(req, res) {
    try{
        const vendas = await prisma.vendas.findMany();
        return res.status(200).json(vendas);
    }catch(error){
        return res.status(404).json({message: "Erro ao listar vendas!"});
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
    criaVenda,
    atualizaVenda,
    deletaVenda,
}