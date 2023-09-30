/*Inserção de imóveis*/

START TRANSACTION;

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Apartamento', '100 m2 em condomínio fechado, 2 quartos', 220000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Casa', '110m2, 3 quartos', 300000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Lote/Terreno', '360m2', 120000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Casa', '168m2, 3 quartos', 330000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Apartamento', '150m2, 3 quartos', 599000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Apartamento', '67m2, 2 quartos', 340000);

INSERT INTO imovel (tipoImovel,descricaoImovel, valorImovel)
VALUES ('Lote/Terreno', '442m2', 500000);

COMMIT;

/*Inserção de vendas*/

START TRANSACTION;

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2018-12-01', 30000, 1);

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2019-01-12', 220000, 2);

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2019-02-22', 300000, 3);

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2019-03-02', 120000, 4);

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2019-03-03', 330000, 5);

INSERT INTO venda (dataVenda, valorPagamento, idImovel)
VALUES ('2019-03-19', 599000, 6);

COMMIT;

/*Inserção de pagamentos*/

START TRANSACTION;

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2018-12-01', 30000, 1);

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2019-01-12', 220000, 2);

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2019-02-22', 300000, 3);

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2019-03-02', 120000, 4);

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2019-03-03', 330000, 5);

INSERT INTO pagamento (dataPagamento, valorPagamento, idVenda)
VALUES ('2019-03-19', 599000, 6);

COMMIT;

/*Consulta de dados com Join*/

SELECT
    i.idImovel,
    i.tipoImovel,
    i.descricaoImovel,
    i.valorImovel,
    v.dataVenda,
    v.valorPagamento,
    p.dataPagamento
FROM
    imovel i
JOIN
    venda v ON i.idImovel = v.idImovel
LEFT JOIN
    pagamento p ON v.idVenda = p.idVenda;