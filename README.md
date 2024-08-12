# Бэкенд приложения TO-DO List

---

## Description
Организация проектов. Группировка задач по прогрессу выполнения и дедлайну задач
Дополнительно - защитники (guard) по авторизации (jwt) или авторизации+роли

- NestJs
  - Swagger UI
  - PrismaORM
  - JWT
- PostgreSQL

## Get started
1. Установить пакеты:
    ```bash 
    $ npm install
    ```

2. Создать .production.env и .development.env:
    ``` 
    PORT=7000
    DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"
    JWT_EXPIRATION_TIME="24h"
    PRIVATE_KEY=secret_key_safasf
    ```
   Пример DATABASE_URL : `postgresql://postgres:pass12345@localhost:5432/dbname?schema=public`
   
   PORT в dev: 5000


3. БД
   ```bash
   npm run migration-and-seeding
   ```

4. Запуск
   ```bash
   npm run start:dev
   ```
   
5. Эксплуатация
   - переходим на [сайт](http://localhost:5000/api/docs#/)
   - авторизуемся/регистрируемся в auth
   - вводим полученный токен в `Authorize`