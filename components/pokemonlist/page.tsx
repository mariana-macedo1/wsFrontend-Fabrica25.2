import React from "react"; 
import { Pokemon } from "@/types";
import Link from "next/link";
import Home from "@/app/page";

interface PokemonListProps {
  pokemons: Pokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="mt-8">
      <div className="text-center">
        
        <ul className="bg-gradient-to-r from-orange-100 to-orange-300 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 rounded-lg">
          {pokemons.map((pokemon) => (
            <li
              key={pokemon.id}
              className="border m-5 border-gray-200 rounded-xl p-4 flex flex-col items-center bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Link href={`/pokemon/${pokemon.name}`} className="flex flex-col items-center">
                <img
                  src={pokemon.image}
                  alt={pokemon.name}
                  className="w-28 h-28 object-contain mb-3 drop-shadow-md"
                />
                <span className="text-sm text-gray-500 mb-1">#{pokemon.id}</span>
                <span className="text-lg font-semibold text-gray-700 capitalize">
                  {pokemon.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonList;
