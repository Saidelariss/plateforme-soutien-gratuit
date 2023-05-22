# Utilise l'image openjdk 19-jdk-slim en tant qu'image de base
FROM openjdk:19-jdk-slim-buster

# Crée un répertoire d'application dans l'image
RUN mkdir /app

# Copie le contenu de votre projet dans l'image
COPY . /app

# Définit le répertoire de travail dans l'image
WORKDIR /app

# Installe les dépendances Maven
RUN ./mvnw dependency:resolve

# Copie le fichier application.properties dans le répertoire de configuration de Spring Boot
COPY src/main/resources/application.properties /app/src/main/resources/application.properties


# Expose le port 8080 pour l'API
EXPOSE 8080

# Définit la commande d'exécution pour démarrer l'API
CMD ["./mvnw", "spring-boot:run"]
