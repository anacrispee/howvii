const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient;
const vendasController = require('../controller/vendasController');
const pagamentosController = require('../controller/pagamentosController');

async function listaImoveis(req, res) {
    try{
        const imoveis = await prisma.imovel.findMany();
        return res.status(200).json(imoveis);
    }catch(error){
        return res.status(404).json({message: "Erro ao listar imóveis!"});
    }
};

async function listaImoveisSomaPagamentos(req, res) {
    try{
        const imoveis = await prisma.imovel.findMany();
        const pagamentos = await prisma.pagamentos.findMany();

        const somaPagamentosPorImovel = {};
        pagamentos.forEach((pagamento) => {
            const idImovel = pagamento.idImovel;
            const valorPagamento = pagamento.valorPagamento;

            if (somaPagamentosPorImovel[idImovel]) {
                somaPagamentosPorImovel[idImovel] += valorPagamento;
            } else {
                somaPagamentosPorImovel[idImovel] = valorPagamento;
            }
        })
        return res.status(200).json(somaPagamentosPorImovel);
    }catch(error) {
        return res.status(404).json({message: "Erro ao listar imóveis e soma de pagamentos"});
    }
}

async function criaImovel (req, res) {
    const {postTipoImovel} = req.body;
    const {descricaoImovel} = req.body;
    const {valorImovel} = req.body;

    try{
        const novoImovel = await prisma.imovel.create({
            data: {
                tipoImovel: postTipoImovel,
                descricaoImovel: descricaoImovel,
                valorImovel: valorImovel,
            },
        });
        return res.status(201).json({message: "Imovel inserido com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao inserir imovel."})
    }
};

async function atualizaImovel (req, res) {
    const {putTipoImovel} = req.body;
    const {putDescricaoImovel} = req.body;
    const {putValorImovel} = req.body;

    try{
        const atualizaImovel = await prisma.imovel.update({
            where: { idImovel: Number(putIdImovel)},
            data: { tipoImovel: putTipoImovel,
                    descricaoImovel: putDescricaoImovel,
                    valorImovel: putValorImovel, },
        });
        return res.status(200).json({message: "Imóvel atualizado com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao atualizar imóvel."})
    }

};

async function deletaImovel (req, res) {
    const {deleteIdImovel} = req.params;

    try{

            prisma.imovel.delete({
                where: {
                    idImovel: Number(deleteIdImovel),
                },
            })

            return res.status(204).json({message: "Imóvel deletado com sucesso!"});
    }catch(error){
        return res.status(400).json({message: "Erro ao deletar imóvel."})
    }

};

module.exports = {
    listaImoveis,
    listaImoveisSomaPagamentos,
    criaImovel,
    atualizaImovel,
    deletaImovel,
}