"use client";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types";
import PokemonList from "@/components/pokemonlist/page";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=905");
        const data = await response.json();

        const pokemonList = data.results.map((pokemon: Pokemon, index: number) => {
          const id = index + 1;
          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });

        setPokemons(pokemonList);
      } catch (e) {
        console.error("erro", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);


  const filteredPokemons = pokemons.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search
  );

  return (
    <div className="mt-6 text-center">
      <h1 className="relative text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] animate-pulse">♢ Poke wiki ♢ </h1>
      <input
        type="text"
        placeholder="Digite nome ou número..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64 px-3 py-1.5 bg-gradient-to-r from-red-800 via-orange-700 to-rose-800 text-white placeholder-gray-900 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-1 transition-all duration-300 ease-in-out"
      />
      {loading ? (
        <p className="text-white">Carregando...</p>
      ) : (
        <PokemonList pokemons={filteredPokemons} />
      )}
      
    </div>
  );
}
