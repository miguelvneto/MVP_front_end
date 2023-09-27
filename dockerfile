# Use uma imagem do Node.js como base
FROM node:18.17.0

# Crie um diretório de trabalho no contêiner
WORKDIR /

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do servidor HTTP
RUN npm install -g http-server

# Copie todos os arquivos do seu site HTML para o diretório de trabalho no contêiner
COPY . .

# Exponha a porta em que o servidor HTTP irá escutar (por padrão, é a porta 8080)
EXPOSE 8080

# Inicialize o servidor HTTP quando o contêiner for executado
CMD ["http-server"]