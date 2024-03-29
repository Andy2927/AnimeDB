import { component$, useStore, useTask$, useVisibleTask$, $, useSignal } from '@builder.io/qwik';
import { Serie } from '~/models/serie';
import { addSerie, deleteSerieByTitle, getPrior, getLater, getSeries, updateSerie } from '~/utils/series-provider';

export const SeriesList = component$(() => {

    const store = useStore<{ series: Serie[]}>({
        series: []
    })

    const form = useStore({
        titulo: '',
        genero: '',
        año_lanzamiento: '',
        num_temporadas: '',
        num_episodios: '',
        estudio_animacion: '',
        director: '',
        creador: '',
    })

    const addOrModify = useSignal("Añadir")

    const oldTitulo = useSignal("")

    const seriesByYear = useSignal("Todas")

    useTask$(async () =>{
        console.log("Desde useTask")
        
    })

    useVisibleTask$(async () => {
        console.log("Desde useVisibleTask")
        store.series = await getSeries()
        console.log(store.series)
    })

    const handleSubmit = $(async (event) => {
        event.preventDefault() // evita el comportamiento por defecto
        if (addOrModify.value === 'Añadir') {
            await addSerie(form)
        } else {
            await updateSerie(oldTitulo.value, form)
            addOrModify.value = "Añadir"
        }
        
    })

    const handleInputChange = $((event: any) => {
        const target = event.target as HTMLInputElement
        form[target.name] = target.value
    })

    const copyForm = $((serie: Serie) => {
        form.titulo = serie.titulo
        form.genero = serie.genero
        form.año_lanzamiento = serie.año_lanzamiento
        form.num_temporadas = serie.num_temporadas
        form.num_episodios = serie.num_episodios
        form.estudio_animacion = serie.estudio_animacion
        form.director = serie.director
        form.creador = serie.creador
    })

    const cleanForm = $(() => {
        form.titulo = ""
        form.genero = ""
        form.año_lanzamiento = ""
        form.num_temporadas = ""
        form.num_episodios = ""
        form.estudio_animacion = ""
        form.director = ""
        form.creador = ""
    })

    const deleteSerie = $(async (titulo: string) => {
        await deleteSerieByTitle(titulo)
        store.series = await getSeries()
    })

    return (
        <div class="flex w-full h-fit justify-center" id="wrapper">
        <div>
        <div class="px-6 py-4 bg-animedb-400 rounded-xl">
            <table class="border-separate border-spacing-2 table-auto">
                <thead>
                    <tr>
                        <th class="title">Titulo</th>
                        <th class="title">Género</th>
                        <th class="title">Lanzamiento</th>
                        <th class="title">Temporadas</th>
                        <th class="title">Episodios</th>
                        <th class="title">Estudio</th>
                        <th class="title">Director</th>
                        <th class="title">Creador</th>
                        
                    </tr>
                </thead>
                <tbody class=" ">
                    {store.series.map((serie) => (
                    <tr key={serie.titulo} class>
                        <td>{serie.titulo}</td>
                        <td>{serie.genero}</td>
                        <td>{serie.año_lanzamiento}</td>
                        <td>{serie.num_temporadas}</td>
                        <td>{serie.num_episodios}</td>
                        <td>{serie.estudio_animacion}</td>
                        <td>{serie.director}</td>
                        <td>{serie.creador}</td>
                        <td class="action-button">
                            <button
                                class="bg-red-600"
                                onClick$={() => deleteSerie(serie.titulo)}>
                                <i class="fa-solid fa-trash"></i>
                                Borrar
                            </button>
                        </td>
                        <td class="action-button">
                            <button
                                class="bg-orange-600"
                                onClick$={() => {
                                    addOrModify.value = 'Editar';
                                    oldTitulo.value = serie.titulo;
                                    copyForm(serie);
                            }}>
                                <i class="fa-solid fa-pencil"></i>
                                Modificar
                            </button>
                        </td>
                    </tr>
                    ))}
                    <tr></tr>
                    <tr>
                        <form onSubmit$={handleSubmit}>
                            <td>
                                <input 
                                name='titulo' 
                                type="text" 
                                value={form.titulo} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='genero' 
                                type="text" 
                                value={form.genero} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input
                                name='año_lanzamiento' 
                                type="text" 
                                value={form.año_lanzamiento} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='num_temporadas' 
                                type="text" 
                                value={form.num_temporadas} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='num_episodios' 
                                type="text" 
                                value={form.num_episodios} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='estudio_animacion' 
                                type="text" 
                                value={form.estudio_animacion} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='director' 
                                type="text" 
                                value={form.director} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <input 
                                name='creador' 
                                type="text" 
                                value={form.creador} 
                                onInput$={handleInputChange}/>
                            </td>
                            <td>
                                <button
                                    class="bg-green-600"
                                    type='submit'>
                                    <i class="fa-solid fa-check"></i>
                                    Aceptar
                                </button>
                            </td>
                            <td>
                                <span
                                    class="button bg-red-600"
                                    style={`visibility: ${addOrModify.value === 'Añadir' ? 'hidden' : 'visible'}`}
                                    onClick$={() => {addOrModify.value = "Añadir"; cleanForm();}}>
                                    <i class="fa-solid fa-x"></i>
                                    Cancelar
                                </span>
                            </td>
                        </form>
                    </tr>
                </tbody>
            </table>
        </div>

        <button
          class={seriesByYear.value === 'Todas' ? 'button-year-highlighted' : 'button-year'}
          onClick$={
            async () => { seriesByYear.value = 'Todas'; store.series = await getSeries()}
          }>
          <i class="fa-solid fa-calendar-days"></i>
          Todas
        </button>

        <button
          class={seriesByYear.value === 'prior' ? 'button-year-highlighted' : 'button-year'}
          onClick$={
            async () => { seriesByYear.value = 'prior'; store.series = await getPrior()}
          }>
          <i class="fa-regular fa-calendar-minus"></i>
          Anteriores al 2000
        </button>

        <button
          class={seriesByYear.value === 'later' ? 'button-year-highlighted' : 'button-year'}
          onClick$={
            async () => { seriesByYear.value = 'later'; store.series = await getLater()}
          }>
          <i class="fa-regular fa-calendar-plus"></i>
          Posteriores al 2000
        </button>

        </div>
      </div>)
});