# passei-direto

- Script com a tabela do banco

DROP TABLE disco;

CREATE TABLE `disco` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artista` varchar(100) NOT NULL,
  `album` varchar(60) NOT NULL,
  `ano_lancamento`int(11) DEFAULT NULL,
  `gravadora` varchar(50) DEFAULT NULL,
  `tempo_execucao` int(11) DEFAULT NULL,
  `capa_url` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


Necessário a criação de um .env na raiz do projeto do back seguindo o modelo abaixo:

NODE_ENV=''
PORT=2931
MYSQL_HOST=''
MYSQL_PORT=
MYSQL_DATABASE=''
MYSQL_USER=''
MYSQL_PASSWORD=''

O front requisita do localhost porta 2931. Para alterar, basta ir no arquivo passei-direto-front/src/services/baseApi.js


