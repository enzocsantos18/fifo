# FIFO


## Problemática

Sempre é bom relaxar entre uma tarefa e outra. Para isso, dentro da FC Santos temos como se fosse uma área de recreação, onde nossos consultores podem relaxar enquanto jogam Fifa no Playstation ou uma partida de sinuca. Isso ajuda a descansar a mente, além de criar uma relação com os colegas ***#SangueLaranja***.

Mas por algo mais descontraído, não é muito organizado. Às vezes demora para alguém jogar, já que temos em torno de mais de 90 colaboradores só da FC Santos. Isso acaba acarretando em uma fila, feita apenas no boca a boca, deixando de fora algumas pessoas que não conseguiram jogar no dia.

## Solução

Uma aplicação que fica responsável pela organização dos jogos e onde serão jogados. Permitindo o usuário escolher qual jogo irá jogar e aonde irá jogar. Assim que ambos forem selecionados, o sistema permite o usuário se juntar a fila do jogo escolhido, com o andamento da fila em tempo real. 

## Como usar


- Clone o projeto:

```bash
git clone https://github.com/leoc7/fifo.git
```
- Instale o [Node](https://nodejs.org/en/download/)

- Instale o [MongoDB](https://www.mongodb.com/try/download/community)



- Para rodar o backend:


Navague para a pasta backend

 Instale as dependências:

```bash
npm install
```

Crie um arquivo .env na pasta raíz (backend) de acordo com o .env.example

Configure de acordo:

```
SERVER_PORT=3333     # Porta do servidor (recomendável deixar 3333)
JWT_SECRET=          # Chave do jwt     
DB_URL=              # URL do seu banco de dados MongoDB   
EMAIL_HOST=          # Servidor de envio de e-mail
EMAIL_PORT=          # Porta do servidor de e-mail
EMAIL_USER=          # Login do usuário do e-mail
EMAIL_PASS=          # Senha do usuário de e-mail
```

Inicie o servidor:
```bash
npm run start
```


- Para rodar o frontend:

Navague para a pasta frontend

 Instale as dependências:

```bash
npm install
```

Inicie o servidor:
```bash
npm run start
```

A aplicação abrirá automaticamente no seu navegador.




## Stack Usada

### Frontend
[React](https://github.com/facebook/react)

### Backend
[Express](https://github.com/expressjs/express)   
[MongoDB](https://github.com/mongodb/mongo)



