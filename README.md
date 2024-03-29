# AnimeDB ⚡️

## Descripción del proyecto

    Una aplicación para almacenar datos de series de anime, tales como:
        - Título.
        - Género.
        - Año de lanzamiento.
        - Sus temporadas.
        - Sus episodios.
        - El estudio de animación.
        - El director.
        - El creador.

- [Demo en YouTube](https://qwik.builder.io/)
- [GitHub del profesor](https://qwik.builder.io/chat)
- [Web desplegada](https://github.com/BuilderIO/qwik)

## Tecnologías utilizadas
- [MongoDB] base de datos noSQL
- [Python]  Lenguaje de programación de alto nivel para el backend
- [QwikCity](https://qwik.builder.io/qwikcity/overview/) Herramientas para acelerar el desarrollo
- [TailWindCSS] Para los estilos del frontend
- [FastAPI] Para la creación de una API y su documentación
- [Docker] Para almacenar en contenedores la BD, backend y frontend
- [TypeScript] Para el frontend

## Estructura del proyecto

Dentro de este proyecto, verás la siguiente estructura de directorios:

```
├── backend/
│   ├── Dockerfile
│   ├── main.py
│   ├── requirements.txt
├── frontend/
│   ├── main.py
│   ├── node_modules/
│   │   └── ...
│   ├── public/
│   │   ├── img/wallpaper.jpg
│   │   ├── favicon.svg
│   │   ├── manifest.json
│   │   ├── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── router-head/router-head.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── head.tsx
│   │   │   └── series-list.tsx
│   │   ├── models/serie.ts
│   │   ├── routes/
│   │   │   ├── index.tsx
│   │   │   ├── layout.tsx
│   │   │   └── service-worker.ts
│   │   ├── utils/series-provider.ts 
│   │   ├── entry.dev.tsx
│   │   ├── entry.preview.tsx
│   │   ├── entry.ssr.tsx
│   │   ├── global.css
│   │   └── root.tsx
│   ├── dockerfile
│   ├── README.md
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
└── docker-compose.yml
```

- `src/routes`: Proporciona el enrutamiento basado en directorios, que puede incluir una jerarquía de archivos de diseño layout.tsx, y un archivo index.tsx como la página. Además, los archivos index.ts son puntos finales. Por favor, consulta la documentación de enrutamiento para más información.

- `src/components`: Directorio recomendado para los componentes.

- `public`: Cualquier activo estático, como imágenes, puede ser colocado en el directorio público. Por favor, consulta la documentación del directorio público de Vite para más información.

## Capturas del funcionamiento

En esta aplicación se pueden listar los animes y filtrarlos por su antiguedad (anterior o posterior al año 2000)
img()
Se pueden modificar los animes y eliminarlos
img()

## Funcionamiento

Usar el comando `docker compose up` para arrancar los contenedores. Será necesario crear la base de datos en mongodb  `animedb` y colección `series`

```shell
docker compose up
```

## Endpoints

En la ruta `http://localhost:5173/`, se puede acceder al frontend desde un navegador web
En la ruta `http://localhost:8000/docs#/`, se puede acceder a la documentación del backend gracias a fastAPI
El backend es accessible a través del puerto 8000

## Producción

Para ejecutar este projecto en un servidor web, es necesario desplegar el backend de python en un servidor y el frontend, el cual hay que ejecutar el siguiente comando para preparar la build de producción

```shell
npm run build
```
