// Criando um projeto de pokedex com o PokeAPI
// Developer: Jhonata Lopes dos Santos

//Definindo as variáveis
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number'); 
const pokemonImage = document.querySelector('.pokemon_image');  

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(apiResponse.status === 200) {
        const data = await apiResponse.json();
        return data;
    }
} // Definindo a função fetchPokemon que faz a requisição para a API do PokeAPI e retorna os dados do pokemon.

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'; // Definindo o nome do pokemon como Loading enquanto os dados não são carregados.

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '';
    } // Verificando se o pokemon existe, se sim, renderiza os dados do pokemon na tela, se não, exibe uma mensagem de erro.
} // Definindo a função renderPokemon que renderiza os dados do pokemon na tela.

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
}); // Adicionando o evento de submit no formulário que chama a função renderPokemon com o valor do input.

buttonPrev.addEventListener('click', () => {
    searchPokemon = searchPokemon - 1;
    if (searchPokemon < 1) {
        searchPokemon = 1;
    }
    renderPokemon(searchPokemon);
}); // Adicionando o evento de click no botão de anterior que chama a função renderPokemon com o valor do pokemon -1.

buttonNext.addEventListener('click', () => {
    searchPokemon = searchPokemon + 1;
    renderPokemon(searchPokemon);
}); // Adicionando o evento de click no botão de próximo que chama a função renderPokemon com o valor do pokemon +1.

renderPokemon(searchPokemon); // Chamando a função renderPokemon com o valor do pokemon 1 para renderizar o primeiro pokemon da pokedex.