"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PokemonData {
  id: number;
}

interface PokemonDetailsProps {
  params: {
    name: string;
  };
}

const PokemonDetails = ({ params: { name } }: PokemonDetailsProps) => {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const data = await response.json();
        setPokemonData(data);
      } catch (e) {
        console.error("erro");
      }
    };

    fetchPokemonData();
  }, [name]);

  if (!pokemonData) {
    return <p>Carregando...</p>;
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`;

  return (
  <div className="text-center mt-8 border-2 border-gray-200 rounded-2xl shadow-lg p-6 bg-white max-w-sm mx-auto">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Detalhes do Pokémon</h2>
    <div className="flex flex-col bg-red-100 items-center rounded-xl p-4 shadow-inner">
      <img
        src={imageUrl}
        alt={name}
        className="w-32 h-32 object-contain mb-3 drop-shadow-md"
      />
      <p className="text-xl font-semibold text-gray-700">Nome: {name}</p>
    </div>
    <div className="mt-4">
      <Link href="/">
        <p className="px-6 py-2 bg-gradient-to-r from-red-600 via-orange-500 to-rose-900 text-white font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">Voltar</p>
      </Link>
    </div>
  </div>
);
};

export default PokemonDetails;
