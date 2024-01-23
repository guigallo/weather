import { Dispatch, useState, createContext, useReducer } from "react";
import { Weather } from "./weather";
import {
  ResponseAction,
  ResponseState,
  initialResponseState,
  responseReducer,
} from "../../shared/requests";

export type LatLon = {
  lat?: number;
  lon?: number;
};

export interface WeatherContextType extends ResponseState<Weather> {
  dispatch: Dispatch<ResponseAction<Weather>>;

  query: LatLon;
  setQuery: Dispatch<LatLon>;
}

const WeatherContext = createContext<WeatherContextType>({
  data: undefined,
  error: undefined,
  loading: false,
  dispatch: () => {},

  query: {},
  setQuery: () => {},
});

WeatherContext.displayName = "Weather";

function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    responseReducer<Weather>,
    initialResponseState
  );
  const [query, setQuery] = useState<LatLon>({});

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        dispatch,

        query,
        setQuery,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export { WeatherContext, WeatherProvider };
