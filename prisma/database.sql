USE `how-vii` ;

CREATE TABLE IF NOT EXISTS `how-vii`.`imovel` (
  `idImovel` INT NOT NULL AUTO_INCREMENT,
  `tipoImovel` VARCHAR(45) NOT NULL,
  `descricaoImovel` VARCHAR(45) NULL,
  `valorImovel` FLOAT NOT NULL,
  PRIMARY KEY (`idImovel`));

CREATE TABLE IF NOT EXISTS `how-vii`.`venda` (
  `idVenda` INT NOT NULL AUTO_INCREMENT,
  `dataVenda` DATE NOT NULL,
  `valorPagamento` FLOAT NOT NULL,
  `idImovel` INT NOT NULL,
  PRIMARY KEY (`idVenda`));

CREATE TABLE IF NOT EXISTS `how-vii`.`pagamento` (
  `idPagamento` INT NOT NULL AUTO_INCREMENT,
  `dataPagamento` DATE NOT NULL,
  `valorPagamento` FLOAT NOT NULL,
  `idVenda` INT NOT NULL,
  PRIMARY KEY (`idPagamento`));
  
  ALTER TABLE `how-vii`.`venda`
  ADD FOREIGN KEY (`idImovel`) REFERENCES `how-vii`.`imovel`(`idImovel`);

  ALTER TABLE `how-vii`.`pagamento`
  ADD FOREIGN KEY (`idVenda`) REFERENCES `how-vii`.`venda`(`idVenda`);