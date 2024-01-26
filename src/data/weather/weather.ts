export type Weather = {
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
};
