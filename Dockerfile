FROM node:18.17

# Definir o diretório de trabalho
WORKDIR /app-dev-web

# Definir a porta como variável de argumento que será enviada para o Docker durante o processo de construção da imagem. Mas, ARG somente existe durante a build
ARG PORT=3001

# ENV é usada para definir variáveis de ambiente dentro do contêiner, porta que será usada durante o execução do projeto
ENV PORT=$PORT

# EXPOSE é usada para informar ao Docker quais portas de rede o contêiner está escutando em tempo de execução.
EXPOSE $PORT

# Copiar o arquivo do projeto para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Definir o comando de inicialização do aplicativo
CMD ["npm", "run", "dev"] 