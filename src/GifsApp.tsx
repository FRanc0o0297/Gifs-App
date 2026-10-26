import { CustomHeader } from "./shared/components/CustomHeader";
import { PreviousSearches } from "./gifs/Components/PreviousSearches";
import { SearchBar } from "./shared/components/SearchBar";
import { GifList } from "./gifs/Components/GifList";

import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const { handleTermClicked, handleSearch, previousTerms, gifs } = useGifs();

  return (
    <>
      {/* header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar Gifs" onQuery={handleSearch} />

      {/* Busquedas Previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
