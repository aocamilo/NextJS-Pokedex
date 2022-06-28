import { FC, ReactNode } from "react";

import Head from "next/head";
import NavBar from "../ui/NavBar";

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<{ children: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ?? "Pokedex"}</title>
        <meta name="author" content="Camilo Arango"></meta>
        <meta name="description" content="Pokedex to study NextJS"></meta>
        <meta name="keywords" content="Pokedex, Pokemon, NextJS"></meta>
        {/* Tags con los que va a ser indexado */}
        <meta property="og:title" content={`Informacion sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la informacion sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/pokemon.jpg`} />
      </Head>
      <NavBar />
      <main
        style={{
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};
