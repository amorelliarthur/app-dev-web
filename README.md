Criar o projeto React
### npx create-next-app

Instalar biblioteca de icones
### npm install react-icons --save

Instalar axios
### npm install axios

Instalar NPM
### npm install

Executar projeto
### npm run dev

Criar a build
### docker-compose up -d --build

Criar e iniciar serviços definidos em um arquivo docker-compose.yml
### docker compose up

Remover os containers
### docker container rm $(docker container ls -aq) --force

Remover as imagens
### docker rmi $(docker image ls -aq) --force

Interromper e remover todos os serviços, contêineres, redes e volumes definidos em um arquivo docker-compose.yml
### docker-compose down

Remover recursos não utilizados do Docker, incluindo imagens, contêineres, redes e volumes
### docker system prune -a --volumes