
const formulario = document.querySelector('#buscador');
const botonbuscar = document.querySelector('#btn_busc');
const botonnext = document.querySelector('#btn_next');
const botonnext2 = document.querySelector('#btn_next2');
const barra = document.getElementById('barra');
let numeroactual = 0;
const pokemonArray = [];
let botonbusquedahecha = false;

function borrarTabla(valor){
    if (valor==false){
        barra.innerHTML = `
                
         `
    }
}


const fetchPokemon = async () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    if (pokemonArray.length == 0){   
        for(let i = 1; i <= 898; i++){
            pokemonArray.push(fetch(getPokemonUrl(i)).then(response =>{ 
                if(response.ok){
                    return response.json()
                }else{
                    throw Error ("No se ha podido realizar la peticion.")
                }
            }))
        }
    }
        
    const pokemonArrayuso = pokemonArray.splice(numeroactual,20);
    if(pokemonArrayuso.indexOf(pokemonArrayuso.length-1) == pokemonArray.indexOf(pokemonArray,length-1)){
        numeroactual = -0.005;
    }
    await Promise.all(pokemonArrayuso)
        .then(pokemons => {
            borrarTabla(botonbusquedahecha);
            console.log(pokemons)
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                numeroactual += 0.005;
                accumulator += `
                    <div class='carta'>
                        <div class='img'>
                            <img class='img-pok' height='210px' width='210px'; src='${pokemon.sprites.front_default}' alt ='Imagen de ${pokemon.name}'/>
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


const filtrar = async ()=>{
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
                <img class='img-pok' height='210px' width='210px'; src='${data.sprites.front_default}' alt ='Imagen de ${data.name}'/>
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
                botonbusquedahecha = true;
                barra.innerHTML = `
            <table class='tabla-pok'>
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

borrarTabla(botonbusquedahecha)
fetchPokemon()
botonbuscar.addEventListener('click',filtrar)
botonnext.addEventListener('click',fetchPokemon)
botonnext2.addEventListener('click',fetchPokemon)