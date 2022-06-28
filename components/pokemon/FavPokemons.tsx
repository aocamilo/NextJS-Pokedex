import { Grid } from "@nextui-org/react";
import React from "react";
import { FavPokemonCard } from "./FavPokemonCard";

export const FavPokemons = ({ favPokemons }: { favPokemons: number[] }) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favPokemons.map((id) => (
        <FavPokemonCard key={id} id={id} />
      ))}
    </Grid.Container>
  );
};
