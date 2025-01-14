# Proyecto de Transacciones

Este proyecto es una aplicación web para gestionar transacciones, desarrollada con un backend en Java Spring Boot, una base de datos PostgreSQL y un frontend en Next.js. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de transacciones.

---

## Tecnologías Utilizadas

- **Backend**: Java 17 con Spring Boot.
- **Base de Datos**: PostgreSQL.
- **Frontend**: React con Next.js.
- **Contenedores**: Docker y Docker Compose.

---

## Configuración y Ejecución Local

### Prerrequisitos

1. Tener instalados:
   - [Docker](https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/)
2. Clonar el repositorio del proyecto:
   ```bash
   git clone https://github.com/LinaMelo/TempoChallenge.git
   cd TempoChallenge
   ```

### Ejecución con Docker

1. Construir y levantar los contenedores:
   ```bash
   docker-compose up --build
   ```

2. Servicios disponibles:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend**: [http://localhost:8080](http://localhost:8080)
   - **Base de Datos**: PostgreSQL accesible en `localhost:5432`.

3. Para detener los contenedores:
   ```bash
   docker-compose down
   ```

---

## Ejecución local sin Docker

1. Asegúrate de tener instalados los siguientes requisitos:
   - Node.js (versión 19 o superior).
   - PostgreSQL.
   - Java 17.

2. Configura la base de datos PostgreSQL:
   - Crea una base de datos llamada `tempodb`.
   - Actualiza las credenciales de acceso en el archivo `src/main/resources/application.yml`.

3. Clona el repositorio:
   ```bash
   git clone <url_del_repositorio>
   cd gestor-transacciones
   ```

4. Ejecuta el backend:
   - Navega al directorio del backend:
     ```bash
     cd backend
     ```
   - Compila y ejecuta la aplicación con Maven:
     ```bash
     ./mvnw spring-boot:run
     ```

5. Ejecuta el frontend:
   - Navega al directorio del frontend:
     ```bash
     cd frontend
     ```
   - Instala las dependencias y ejecuta la aplicación:
     ```bash
     npm install
     npm start
     ```

6. Accede a la aplicación:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)


## Uso de la API

La documentación interactiva de la API está disponible en:
```
http://localhost:8080/swagger-ui.html
```

### Endpoints principales

#### **GET /transaction**
**Descripción:** Obtiene la lista de transacciones.

**Response:**
```json
[
  {
    "id": 1,
    "nameClient": "Cliente Ejemplo",
    "commerce": "Comercio Ejemplo",
    "transactionDate": "2025-01-01T10:00:00",
    "amount": 100.0
  }
]
```

---

#### **POST /transaction**
**Descripción:** Crea una nueva transacción.

**Request:**
```json
{
  "nameClient": "Cliente Ejemplo",
  "commerce": "Comercio Ejemplo",
  "transactionDate": "2025-01-01T10:00:00",
  "amount": 100.0
}
```

**Response:**
```json
{
  "id": 2,
  "nameClient": "Cliente Ejemplo",
  "commerce": "Comercio Ejemplo",
  "transactionDate": "2025-01-01T10:00:00",
  "amount": 100.0
}
```

---

#### **PUT /transaction**
**Descripción:** Actualiza una transacción existente.

**Request:**
```json
{
  "id": 2,
  "nameClient": "Cliente Actualizado",
  "commerce": "Comercio Actualizado",
  "transactionDate": "2025-01-01T10:00:00",
  "amount": 150.0
}
```

**Response:**
```json
{
  "id": 2,
  "nameClient": "Cliente Actualizado",
  "commerce": "Comercio Actualizado",
  "transactionDate": "2025-01-01T10:00:00",
  "amount": 150.0
}
```

---

#### **DELETE /transaction/{id}**
**Descripción:** Elimina una transacción por ID.

**Request:**
```
No se requiere cuerpo en la solicitud.
```

**Response:**
- Código de estado: `204 No Content`

---

## Docker Hub

La imagen del backend está disponible en Docker Hub en la siguiente URL:
[https://hub.docker.com/r/linamelo/backend](https://hub.docker.com/r/linamelo/backend)

Para hacer uso de esta y levantar los contenedores:
   ```bash
   docker pull linamelo/backend:latest
   ```

## Notas Adicionales

- Los logs de los servicios se pueden consultar ejecutando:
  ```bash
  docker-compose logs -f
  ```
- Asegúrate de que el puerto 5432 (PostgreSQL), 8080 (Backend) y 3000 (Frontend) estén disponibles en tu sistema.




