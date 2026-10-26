//custom hook
import { useRef, useState } from "react";
import { mockGifs } from "../../mock-data/gifs.mock";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

/* const gifsCache: Record<string, Gif[]> = {}; */
/* el gifsCache debe quedar afuera del custom hook asi no se pierde al rerenderizar el componente de useGifs(queda fuera del ciclo de vida del rerender del componente de react custom hook) otra manera es usar el useRef */

export const useGifs = () => {
  const [gifs, setGifs] = useState<Gif[]>(mockGifs);
  /* tiene el mockGifs en vez de ([]) para que no quede vacío */
  const [previousTerms, setpreviousTerms] = useState<string[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
    gifsCache.current[term] = gifs;
  };

  const handleSearch = async (query: string = "") => {
    query = query.trim().toLowerCase();
    if (previousTerms.includes(query)) return;
    if (query.length === 0) return;

    setpreviousTerms([query, ...previousTerms].splice(0, 4));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);

    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };

  return {
    //props
    gifs,
    previousTerms,
    //methods
    handleTermClicked,
    handleSearch,
  };
};
