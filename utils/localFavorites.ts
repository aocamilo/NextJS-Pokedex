const getFavs = () => JSON.parse(localStorage.getItem("favs") || "[]");

const toggleFavs = (id: number) => {
  let favs: number[] = getFavs();

  if (favs.includes(id)) {
    favs = favs.filter((pokeId) => pokeId !== id);
  } else {
    favs.push(id);
  }

  localStorage.setItem("favs", JSON.stringify(favs));
};

const isInFavs = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  const favs: number[] = getFavs();

  return favs.includes(id);
};

const pokemons = () => {
  return getFavs();
};

export default { toggleFavs, isInFavs, pokemons };
