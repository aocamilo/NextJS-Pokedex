import { Card, Grid } from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";

export const FavPokemonCard: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter();
  const onCardClick = () => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <Grid xs={6} sm={3} md={3} xl={2} key={id}>
      <Card hoverable clickable css={{ padding: 10 }} onClick={onCardClick}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width={"100%"}
          height={140}
        />
      </Card>
    </Grid>
  );
};
