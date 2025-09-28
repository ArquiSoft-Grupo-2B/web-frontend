# RunPath Frontend - Docker

Este proyecto React + Vite está preparado para ejecutarse en **modo desarrollo** y **producción** usando Docker, sin necesidad de Nginx.

---

## Requisitos

- Docker >= 24.x  
- Docker Compose (integrado en Docker)  

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las variables necesarias:

```env
VITE_MAPBOX_TOKEN=tu_token_de_mapbox
```

---

## Desarrollo

Levanta un contenedor con hot reload y todas las funcionalidades de desarrollo:

```bash
docker compose -f docker-compose.dev.yml --env-file .env up --build
```

- Accede a la app en: [http://localhost:5173](http://localhost:5173)  
- Para detener los contenedores:

```bash
docker compose -f docker-compose.dev.yml down
```

---

## Producción

Levanta un contenedor con la app ya construida:

```bash
docker compose -f docker-compose.prod.yml --env-file .env up --build -d
```

- Accede a la app en: [http://localhost:5173](http://localhost:5173)  
- Para detener los contenedores:

```bash
docker compose -f docker-compose.prod.yml down
```

---

## Comandos útiles

- Ver contenedores corriendo:

```bash
docker ps
```

- Entrar a un contenedor:

```bash
docker exec -it <nombre_contenedor> sh
```

- Reconstruir imagen sin cache:

```bash
docker compose -f docker-compose.prod.yml build --no-cache
```

