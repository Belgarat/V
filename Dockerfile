# Usa un'immagine base di Node.js leggera
FROM node:18-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del progetto
COPY package*.json ./
COPY . .

# Installa le dipendenze
RUN npm install --omit=dev

# Espone la porta 3000
EXPOSE 3000

# Comando per avviare l'app
CMD ["node", "server.js"]
