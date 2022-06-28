import { NextPage } from "next";
import { Layout } from "../../components/layouts/Layout";

import { GetStaticProps, GetStaticPaths } from "next";
import pokeApi from "../../api/pokeApi";
import { Pokemon } from "../../interfaces";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { getPokemonInfo, localFavs } from "../../utils";
import { useState } from "react";
import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavs, setIsInFavs] = useState(localFavs.isInFavs(pokemon.id));

  const onFav = () => {
    localFavs.toggleFavs(pokemon.id);
    setIsInFavs(!isInFavs);

    if (!isInFavs) {
      confetti({
        zIndex: 999,
        particleCount: 1000,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      });
    }
  };

  const { name } = pokemon;
  return (
    <Layout title={`Pokedex | ${name}`}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "/no-image.png"
                }
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>
              <Button color="gradient" ghost={!isInFavs} onClick={onFav}>
                {isInFavs ? "Remove from favorites" : "Save in favorites"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export default PokemonPage;
