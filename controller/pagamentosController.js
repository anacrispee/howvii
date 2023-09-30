const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const vendasController = require('../controller/vendasController');
const imoveisController = require('../controller/imoveisController');

async function listaPagamentos(req, res) {
    try{
        const pagamentos = await prisma.pagamentos.findMany();
        return res.status(200).json(pagamentos);
    }catch(error){
        return res.status(404).json({message: "Erro ao listar pagamentos!"});
    }
};

async function criaPagamento (req, res) {
    const {postDataPagamento} = req.body;
    const {postValorPagamento} = req.body;
    const {idVenda} = req.params;

    try{
        const novoPagamento = await prisma.pagamentos.create({
            data: {
                dataPagamento: postDataPagamento,
                valorPagamento: postValorPagamento,
                idVenda: idVenda,
            },
        });
        return res.status(201).json({message: "Pagamento inserido com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao inserir pagamento."})
    }
};

async function atualizaPagamento (req, res) {
    const {putDataPagamento} = req.body;
    const {putValorPagamento} = req.body;
    const {idPagamento} = req.params;

    try{
        const atualizaPagamento = await prisma.venda.update({
            where: { idPagamento: Number(putIdPagamento)},
            data: { dataPagamento: putDataPagamento,
                    valorPagamento: putValorPagamento,
                },
        });
        return res.status(200).json({message: "Pagamento atualizada com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao atualizar pagamento."})
    }

};

async function deletaPagamento (req, res) {
    const {deleteIdPagamento} = req.params;

    try{

            prisma.pagamentos.delete({
                where: {
                    idPagamento: Number(deleteIdPagamento),
                },
            })

            return res.status(204).json({message: "Pagamento deletado com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao deletar pagamento."})
    }

};

module.exports = {
    listaPagamentos,
    criaPagamento,
    atualizaPagamento,
    deletaPagamento,
}