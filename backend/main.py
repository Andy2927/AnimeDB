from fastapi import FastAPI, HTTPException

# Para poder utilizar campos con fecha
from datetime import date, datetime

# Pydantic es una librería para validar los datos.
# BaseModel sirve para definir clases para crear los modelos de datos que se van a usar en la API.
from pydantic import BaseModel

from typing import List

# Motor es una versión asíncrona de PyMongo,
# la biblioteca estándar de Python para trabajar con MongoDB.
import motor.motor_asyncio

# Para aceptar peticiones de diferentes dominios.
from fastapi.middleware.cors import CORSMiddleware

# Para usar RegEX
import re


# Define el modelo de datos para un usuario utilizando Pydantic.
# Esto ayuda a FastAPI a validar los tipos de datos entrantes.
class Serie(BaseModel):
    titulo: str
    genero: str
    año_lanzamiento: int
    num_temporadas: int
    num_episodios: int
    estudio_animacion: str
    director: str
    creador: str

# Crea la instancia de la aplicación FastAPI
app = FastAPI()

# Lista de origenes permitidos.
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Método permitidos
    allow_headers=["*"], # Cabeceras permitidas
)

# Cadena de conexión a MongoDB con autenticación
MONGODB_URL = "mongodb://admin:123@mongodb:27017/?authSource=admin"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
db = client.animedb

# Endpoint para obtener una lista de series por el título.
@app.get("/series/{titulo}", response_description="Obtiene una serie", response_model=List[Serie])
async def find_serie(titulo: str):
    regex = re.compile(f".*{re.escape(titulo)}.*", re.IGNORECASE)
    serie = await db["series"].find({"titulo": {"$regex": regex}}).to_list(1000)
    if serie is not None:
        return serie
    raise HTTPException(status_code=404, detail=f"Serie con título {titulo} no se ha encontrado.")

# Endpoint para listar todas las series.
@app.get("/series/", response_description="Lista de todas las series de animación", response_model=List[Serie])
async def list_series():
    series = await db["series"].find().to_list(1000)
    return series

#Endpoint para crear una nueva serie
@app.post("/series/", response_description="Añade una nueva serie", response_model=Serie) 
async def create_series(serie: Serie):
    serie_dict = serie.dict()
    await db["series"].insert_one(serie_dict)
    return serie


    
# Endpoint paura borrar una serie específica por el título.
@app.delete("/series/{titulo}", response_description="Borrar una serie", status_code=204)
async def delete_serie(titulo: str):
    delete_result = await db["series"].delete_one({"titulo": titulo})

    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Serie con título {titulo} no se ha encontrado.")

# Endpoint para actualizar una serie específica por título.
@app.put("/series/{titulo}", response_description="Actualizar una serie por el título", status_code=204)
async def update_serie(titulo: str, serie: Serie):
    serie_dict = serie.dict()
    await db["series"].update_one({"titulo": titulo}, {"$set": serie_dict})
    return serie

# Endpoint para listar todas las series anteriores al año 2000.
@app.get("/series/prior/", response_description="Listado de series anteriores al año 2000.", response_model=List[Serie])
async def list_years_prior():
    pipeline = [
        {
            "$project": {
                "titulo": 1,
                "genero": 1,
                "año_lanzamiento": 1,
                "num_temporadas": 1,
                "num_episodios": 1,
                "estudio_animacion": 1,
                "director": 1,
                "creador": 1,
            }
        },
        {
            "$match": {
                "año_lanzamiento": {"$lt": 2000}
            }
        }
    ]
    years_prior = await db["series"].aggregate(pipeline).to_list(1000)
    return years_prior

# Endpoint para listar todas las series del año 2000 en adelante.
@app.get("/series/later/", response_description="Listado de series lanzadas del año 2000 en adelante.", response_model=List[Serie])
async def list_years_later():
    pipeline = [
        {
            "$project": {
                "titulo": 1,
                "genero": 1,
                "año_lanzamiento": 1,
                "num_temporadas": 1,
                "num_episodios": 1,
                "estudio_animacion": 1,
                "director": 1,
                "creador": 1,
            }
        },
        {
            "$match": {
                "año_lanzamiento": {"$gte": 2000}
            }
        }
    ]
    years_later = await db["series"].aggregate(pipeline).to_list(1000)
    return years_later
