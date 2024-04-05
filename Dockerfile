FROM node:20

RUN npm install -g @angular/cli

WORKDIR /
RUN mkdir app
WORKDIR /app

ENV APP_NAME 'bookstore'
ENV ROUTING 'true'
ENV STANDALONE 'true'
ENV STRICT 'true'
ENV STYLE 'css'

CMD ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE \
    # && mv $APP_NAME/* . \
    # && rm -rf $APP_NAME \
    && cd $APP_NAME \
    && ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200
