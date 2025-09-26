FROM nginx:1.29.1-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY frontend /www/frontend
COPY nginx.conf /etc/nginx/conf.d/default.conf