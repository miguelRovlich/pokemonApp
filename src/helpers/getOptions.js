import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {
    const pokemons = Array.from(Array(650));
    return pokemons.map((_, index) => index + 1);

}
const getPokemonOptions = async () => {
    const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
    const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4));
    return pokemons;
}

const getPokemonNames = async ([a,b,c,d]) => {
    
    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ];

    const [pokemonA, pokemonB, pokemonC, pokemonD] = await Promise.all(promiseArr);
    return [
        {name: pokemonA.data.name, id: pokemonA.data.id},
        {name: pokemonB.data.name, id: pokemonB.data.id},
        {name: pokemonC.data.name, id: pokemonC.data.id},
        {name: pokemonD.data.name, id: pokemonD.data.id}
    ]
}

export default getPokemonOptions;