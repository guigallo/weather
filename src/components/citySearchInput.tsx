import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Dispatch, Fragment, useEffect, useState } from "react";
import { GeoCity } from "../data/geoCity/geoCity";
import useGeoCity from "../data/geoCity/useGeoCity";

function CitySearchInput({
  onSelectCity,
}: {
  onSelectCity?: Dispatch<GeoCity>;
}) {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState<GeoCity | undefined>(undefined);
  const query = useGeoCity();

  useEffect(() => {
    if (inputValue === "") return;
    query.setQuery(inputValue);
  }, [inputValue, query]);

  useEffect(() => {
    if (!city) return;
    if (typeof onSelectCity === "function") onSelectCity(city);
  }, [city, onSelectCity]);

  return (
    <Autocomplete
      id="city-search"
      options={query.data || []}
      getOptionLabel={(option: GeoCity) => option.name}
      filterOptions={(x) => x}
      loading={query.loading}
      onInputChange={(event, value, reason) => {
        if (reason === "input") setInputValue(value);
      }}
      onChange={(event, value, reason) => {
        if (reason === "selectOption") setCity(value || undefined);
      }}
      isOptionEqualToValue={(option) =>
        option.name.toLowerCase() === query.data?.[0]?.name.toLowerCase()
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select your city"
          placeholder="Select your city"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {query.loading && (
                  <CircularProgress color="inherit" size={20} />
                )}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default CitySearchInput;
