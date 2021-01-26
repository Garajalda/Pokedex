
const formulario = document.querySelector('#buscador');
const boton = document.querySelector('#btn_busc');
const barra = document.getElementById('barra')



    var j = 20;

    function noseque(){
        
        j = j + 20;
        console.log(j);
        fetchPokemon()
        }

const fetchPokemon = async () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonArray = []
    
    for(let i = 1; i <= j; i++){
        
            
        pokemonArray.push(fetch(getPokemonUrl(i)).then(response =>{ 
            if(response.ok){
                return response.json()
            }else{
                throw Error ("No se ha podido realizar la peticion.")
            }
        }))
        }
    
        await Promise.all(pokemonArray)
            .then(pokemons => {

                barra.innerHTML = `
                
                `
                
                
                console.log(pokemons)
                const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                    accumulator += `
                    
                    <div class='carta'>
                        <div class='img'>
                            <img class='img-pok' height='210px' width='210px'; src='${pokemon.sprites.front_default}'/>
                        </div>
                        <div class='contenido-carta'>
                            <p>#${pokemon.id.toString().padStart(3,'0')}</p>
                            <div><p>Nombre: ${pokemon.name}</p></div>
                        </div>
                    </div>
                    `
                    return accumulator
                }, '')
                const div = document.getElementById('pok1')
                div.innerHTML = lisPokemons
                
            })
    }
fetchPokemon()






const filtrar = async ()=>{
    //console.log(formulario.value);
    const url =  `https://pokeapi.co/api/v2/pokemon/${formulario.value}`
    await fetch(url)
    .then(response =>{
    if(response.ok){
        
        return response.json()
        
    }else{
        throw Error ("No se ha podido realizar la peticion.")
    }
    })
    .then(data => {

       

        let mensaje = document.getElementById('mensaje')
        
        if(formulario.value == ""){
            
            mensaje.innerHTML = `
                <span class="errorvacio">Inserta algún valor válido.</span>
            `
            
            
        }else{
            mensaje.innerHTML = `
                <span></span>
            `
            let pok = document.getElementById('pok')
            
        
        try{
            var tipo = data.types[1].type.name;
           }catch(error){
               var tipo = "";
           }

        var clase1 = tipo;
        var clase = data.types[0].type.name;
       

        
        pok.innerHTML = `
       
        <div class='carta1'>
            <div class='img'>
                <img class='img-pok' height='210px' width='210px'; src='${data.sprites.front_default}'/>
            </div>
            <div class='contenido-carta'>
                <p>#${data.id.toString().padStart(3,'0')}</p>
                <div><p>Nombre: ${data.name}</p></div>
                <div><p>EXP: ${data.base_experience}</p></div>

                
                <div class='tipo'>Tipo: <div class='tipo1'><span class='${clase}'>${data.types[0].type.name}<span></div>
                                        <div class='tipo2'><span class='${clase1}'> ${tipo}<span></div>
                </div>
                <p>Peso: ${data.weight}kg<p>
                <p>Altura: ${data.height}m<p>
            </div>
        </div>`

        barra.innerHTML = `
            <table class='tabla-pok' >
                
                
            <thead>
                
                    <th>${data.stats[0].stat.name} </th> 
                    <th>${data.stats[1].stat.name} </th>
                    <th>${data.stats[2].stat.name} </th> 
                    <th>${data.stats[3].stat.name} </th>
                    <th>${data.stats[4].stat.name} </th>
                    <th>${data.stats[5].stat.name} </th>
                
                </thead>
                
                <tbody>
                <tr>
                
                    <td data-label='${data.stats[0].stat.name}'>${data.stats[0].base_stat} </td> 
                    <td data-label='${data.stats[1].stat.name}'>${data.stats[1].base_stat} </td>
                    <td data-label='${data.stats[2].stat.name}'>${data.stats[2].base_stat} </td>
                    <td data-label='${data.stats[3].stat.name}'>${data.stats[3].base_stat} </td>
                    <td data-label='${data.stats[4].stat.name}'>${data.stats[4].base_stat} </td>
                    <td data-label='${data.stats[5].stat.name}'>${data.stats[5].base_stat} </td>
                </tr>
                </tbody>
            </table>
        `
            
        
        }
        
        
        console.log(data)
    })

    .catch(err=>console.log(err))
       
}

//boton event click tal


boton.addEventListener('click',filtrar)

// if( == null){
//     let busqueda = document.getElementById('busqueda')
//     busqueda.innerHTML = `
//         <p>pon algo</p>
//     `
// }else{
    
// }
