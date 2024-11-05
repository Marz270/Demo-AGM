FROM postgres:alpine
# Vamos a configurar la localización
# RUN localedef -i es_ES -c -f UTF-8 -A /usr/share/locale/locale.alias es_ES.UTF-8
ENV LANG es_ES.utf8
ENV TZ=America/Montevideo

# Vamos a copiar los script iniciales. Solo se ejecutarán al momento de crear la base de datos. Esto no lo usariamos para una imagen de producción
COPY ./*.sql /docker-entrypoint-initdb.d
