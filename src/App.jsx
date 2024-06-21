import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import SearchOption from './Components/SearchOption/SearchOption'
import PokemonCard from './Components/PokemonCard/PokemonCard'

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  //Fetch data
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const fetches = response.data.results.map(pokemon =>
          axios.get(pokemon.url).then(res => res.data)
        )
        const results = await Promise.all(fetches)
        setPokemons(results)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
      }
    }

    fetchPokemons()
  }, [])

  // Search option
  const handleSearch = query => {
    setSearchQuery(query.toLowerCase())
  }

  const filterPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery)
  )

  return (
    <div className='App'>
      <h1>Pokémon List</h1>
      <SearchOption onSearch={handleSearch} />
      <div className='pokemon-list'>
        {filterPokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default App
