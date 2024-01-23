import { useContext, useEffect } from "react";
import { OW_GEO_URL, owToGeoConverter } from "../../services/openWeather";
import { requestFactory } from "../../shared/requests";
import config from "../../config";
import { GeoCityContext, GeoCityContextType } from "./geo.context";

export default function useGeoCity(): GeoCityContextType {
  const context = useContext(GeoCityContext);
  const { dispatch, query } = context;

  useEffect(() => {
    const getGeo = async () => {
      if (!query) return;

      dispatch({ type: "loading" });

      try {
        const response = await requestFactory({
          url: OW_GEO_URL,
          params: { q: query, appid: config.openWeather.apiKey },
          converter: { onSuccess: owToGeoConverter },
        });
        dispatch({ type: "success", payload: response.data });
      } catch (err) {
        dispatch({ type: "error", error: "unknown error" });
      }
    };
    getGeo();
  }, [query, dispatch]);

  return context;
}
