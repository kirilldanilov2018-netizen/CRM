# Simple CRM

Небольшой учебный CRM-проект для изучения **Docker, Docker Compose и основ контейнеризации приложений**.

Приложение позволяет просматривать список контактов, добавлять новых клиентов и удалять существующие записи.

Проект состоит из трёх сервисов: frontend, backend и database. Каждый сервис запускается в отдельном Docker-контейнере.

## Возможности приложения

- Просмотр списка контактов
- Добавление нового контакта
- Удаление контакта
- Отображение количества контактов
- Проверка доступности backend и подключения к базе данных

## Архитектура проекта

```text
                 Browser
                    |
                    | http://localhost:8080
                    v
             +-------------+
             |   Frontend  |
             |    Nginx    |
             +-------------+
                    |
          /         |         \
         /          |          \
  Static files   /api/*         |
                    |            |
                    v            |
             +-------------+    |
             |   Backend   |    |
             | Node.js     |    |
             | Express API |    |
             +-------------+
                    |
                    | PostgreSQL connection
                    v
             +-------------+
             |  Database   |
             | PostgreSQL  |
             +-------------+
```

### Используемые технологии

| Компонент | Технологии |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Web server | Nginx |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Containerization | Docker |
| Orchestration | Docker Compose |

## Структура проекта

```text
simple-crm/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── database/
│   ├── Dockerfile
│   └── init.sql
│
