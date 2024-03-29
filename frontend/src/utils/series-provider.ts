// Funciones de acceso a la API de series.

import { Serie } from "~/models/serie"

// Obtiene todas las series
export const getSeries = async (): Promise<Serie[]>  => {
    try {
        const response = await fetch('http://localhost:8000/series/')
        const series = response.json()
        console.log(series);
        console.log('obtener series');
        return series
    } catch (error) {
        console.error(error)
    }

    return <Serie[]><unknown>null
}

// Obtiene todas las series anteriores al 2000
export const getPrior = async (): Promise<Serie[]>  => {
    try {
        const response = await fetch('http://localhost:8000/series/prior/')
        const series = response.json()
        return series
    } catch (error) {
        console.error(error)
    }

    return <Serie[]><unknown>null
}

// Obtiene todas las series posteriores al 2000
export const getLater = async (): Promise<Serie[]>  => {
    try {
        const response = await fetch('http://localhost:8000/series/later/')
        const series = response.json()
        return series
    } catch (error) {
        console.error(error)
    }

    return <Serie[]><unknown>null
}

// Añade una serie.
export const addSerie = async (serie: Serie)  => {
    try {
        await fetch('http://localhost:8000/series/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie),
        })
        
    } catch (error) {
        console.error(error)
    }
}

// Modifica una serie.
export const updateSerie = async (titulo: string, serie: Serie)  => {
    try {
        await fetch(`http://localhost:8000/series/${titulo}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(serie),
        })
        
    } catch (error) {
        console.error(error)
    }
}


// Elimina una serie.
export const deleteSerieByTitle = async (titulo: string)  => {
    try {
        await fetch(`http://localhost:8000/series/${titulo}`,
        {
            method: 'DELETE',
        })
    } catch (error) {
        console.error(error)
    }
}