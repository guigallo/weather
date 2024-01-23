import { Dispatch, useState, createContext, useReducer } from "react";
import { GeoCity } from "./geoCity";
import {
  ResponseState,
  ResponseAction,
  responseReducer,
  initialResponseState,
} from "../../shared/requests";

export interface GeoCityContextType extends ResponseState<GeoCity[]> {
  dispatch: Dispatch<ResponseAction<GeoCity[]>>;

  query: string;
  setQuery: Dispatch<string>;

  selected?: GeoCity;
  setSelected: Dispatch<GeoCity | undefined>;
}

const GeoCityContext = createContext<GeoCityContextType>({
  data: undefined,
  error: undefined,
  loading: false,
  dispatch: () => {},

  query: "",
  setQuery: () => {},

  selected: undefined,
  setSelected: () => {},
});

GeoCityContext.displayName = "GeoCity";

function GeoCityProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    responseReducer<GeoCity[]>,
    initialResponseState
  );
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<GeoCity | undefined>(undefined);

  return (
    <GeoCityContext.Provider
      value={{
        ...state,
        dispatch,

        query,
        setQuery,

        selected,
        setSelected,
      }}
    >
      {children}
    </GeoCityContext.Provider>
  );
}

export { GeoCityContext, GeoCityProvider };
