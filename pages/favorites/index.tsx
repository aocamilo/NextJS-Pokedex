import React from "react";
import { Layout } from "../../components/layouts/Layout";
import NoFavs from "../../components/ui/NoFavs";
import { useState, useEffect } from "react";
import { localFavs } from "../../utils";
import { FavPokemons } from "../../components/pokemon";

const FavoritesPage = () => {
  const [favPokemons, setFavPokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavPokemons(localFavs.pokemons);
  }, []);

  return (
    <Layout title="Favorite Pokemons">
      {favPokemons.length === 0 ? (
        <NoFavs />
      ) : (
        <FavPokemons favPokemons={favPokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
