## Descrição

Interface com catálogo de naves e pilotos de Star Wars.

Backend desenvolvido utilizando Nest com Typescript para desenvolvimento da API, TypeORM, PostgreSQL, Multer e Jest. \
Frontend desenvolvido utilizando React com Typescript, Tailwind e AntD.

## Configuração

Cada diretório contém as variáveis de ambiente de exemplo (.env.example) que devem ser fornecidas no .env para conexão com o banco e funcionamento da interface.

No .env do frontend adicionar o endpoint com a porta do backend (REAC_APP_API_URL), e no backend adicionar o endpoint do frontend (REACT_APP).

## Instalar dependências

As etapas de instalação são as mesmas para o backend e frontend porém devem ser feitas em seus respectivos diretórios, api e frontend.

```bash
$ npm install
```

Para upar as imagens no banco de dados, rode as migrations na raiz da /api

```bash
$ npm run typeorm migration:run 
```

Para subir no docker, rodar na raiz do repositório 

```bash
$ docker-compose up -d
```

## Running

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

