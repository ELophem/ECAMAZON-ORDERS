# Utilisez une image de base
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez les fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application écoute
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "index.js"]