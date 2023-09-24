# Этап 1: Сборка приложения
FROM node:16 AS build
# Устанавливаем рабочий каталог
WORKDIR /app
# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код приложения
COPY . .

# Сборка приложения
RUN npm run build

# Этап 2: Запуск Nginx
FROM nginx:alpine

# Копирование собранного приложения и настройки nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
