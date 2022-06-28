import type { NextPage, GetStaticProps } from "next";
import { Layout } from "../components/layouts";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse } from "../interfaces";
import { SmallPokemon } from "../interfaces/pokemon-list";
import { Grid } from "@nextui-org/react";
import { PokemonCard } from "../components/pokemon";

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon, id) => ({
    ...pokemon,
    id: id + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      id + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

const HomePage: NextPage<{ pokemons: SmallPokemon[] }> = ({ pokemons }) => {
  console.log(pokemons);
  return (
    <Layout title="Pokemons list">
      <Grid.Container gap={2} justify="flex-start">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid.Container>
    </Layout>
  );
};

export default HomePage;
