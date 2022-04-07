<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
  <PokemonPage/>
  <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
  <PokemonOptions 
  :pokemons="pokemonArr"
  @selection-pokemon="checkAnswer"/>
  
        <template v-if="showAnswer">
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame">
                Nuevo Juego
            </button>
        </template>
  </div>  
  
</template>

<script>
import PokemonPage from './components/PokemonPage.vue'
import PokemonPicture from './components/PokemonPicture.vue'
import PokemonOptions from './components/PokemonOptions.vue'
import getPokemonOptions from '@/helpers/getOptions.js'

export default {
  name: 'App',
  components: {
    PokemonPage,
    PokemonPicture,
    PokemonOptions
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false
    }
  },
  methods: {
    async mixPokemonArray(){
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
    },checkAnswer( selectedId ) {
            this.showPokemon = true
            this.showAnswer  = true

            if( selectedId === this.pokemon.id ) {
                this.message = `Correcto, ${ this.pokemon.name }`
            } else {
                this.message = `Oops, era ${ this.pokemon.name }`
            }
        },
        newGame() {

            this.showPokemon = false
            this.showAnswer  = false
            this.pokemonArr  = []
            this.pokemon     = null
            this.mixPokemonArray()            

        }
  },
  mounted() {
    this.mixPokemonArray()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
