<div align="center">
    <h1 align="center">Node + Hapi + Mongo - Example</h1>
</div>

## Author

**Nome:** `Otávio Marques`

**E-mail:** `otaviomarques@gmail.com`

**Usuário:** @omrqs

## Apresentação

Este repositório visa demonstrar o desenvolvimento de uma API REST utilizando node e seu ecossitema, fornecendo endpoints utilizando [Hapi](https://hapi.dev/). Algumas libs adicionais como hapi-cors, hapi-pino, husky e mongoose foram utilizadas.

O ambiente roda em cima de docker/docker-compose, usando imagens oficiais publicadas [https://hub.docker.com](https://hub.docker.com).

A aplicação é coberta por testes utilizando [Jest]() e está gerando relatórios de cobertura com o clover.

## Começando

Clone este repositório, crie uma nova _branch_, como por exemplo `node-example`.

Na sua máquina, você só precisa ter o node [sugiro usar o NVM](https://github.com/nvm-sh/nvm) e o [npm] instalados, além de ter o [Docker](https://www.docker.com/get-started) e o [Docker Compose](https://docs.docker.com/compose/) instalados.

Para rodar a primeira vez o repositório, basta usar os comandos abaixo na raiz do projeto. Ele ira configurar a aplicação.
Garanta que a porta `8000` de sua máquina não esteja sendo utilizada e rode o comando abaixo:

```bash
npm i
npm run setup
```

Para rodar a aplicação, você pode subir o projeto utilizando o `docker-compose`.

```bash
docker-compose up
```

A partir daqui, está tudo configurado :rocket:

Assim, será possível acessar a aplicação em [http://localhost:8000](http://localhost:8000).

## Testando

Para rodar os testes da aplicação, utilize as tasks abaixo, que utilizam o [jest](https://jestjs.io/):

```bash
npm run test:unit
npm run test:spec
```
---

Caso deseje rodar todas as checagens de qualidade de código, rode o comando abaixo:

```bash
npm run test:coverage
```

Para checar em detalhes a cobertura de código da aplicação, após rodar o _coverage_,
abra o arquivo `coverage/lcov-report/index.html` em seu navegador.
