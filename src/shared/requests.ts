import { genUrl } from "./url";

type RequestFactoryParams<T> = {
  url: string;
  params: { [key: string]: string | number };
  converter: {
    onSuccess?: (data: any) => T | undefined;
    onError?: (error: string | undefined) => string | undefined;
  };
};

export async function requestFactory<T>({
  url,
  params,
  converter: { onSuccess, onError },
}: RequestFactoryParams<T>): Promise<{
  data?: T | undefined;
  error?: string | undefined;
}> {
  try {
    const res = await fetch(genUrl(url, params));
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    let data = await res.json();
    if (typeof onSuccess === "function") data = onSuccess(data);

    return { data, error: undefined };
  } catch (err) {
    console.error(err, "failed to fetch");
    let errorMessage;
    if (typeof err === "string") errorMessage = err;
    if (err instanceof Error) errorMessage = err.message;
    if (typeof onError === "function") errorMessage = onError(errorMessage);

    return { error: errorMessage || "unknown error" };
  }
}

export interface ResponseState<T> {
  data?: T | undefined;
  error?: string | undefined;
  loading: boolean;
}

export interface ResponseAction<T> {
  type: "loading" | "success" | "error";
  payload?: T;
  error?: string | undefined;
}

export const initialResponseState: ResponseState<any> = {
  data: undefined,
  error: undefined,
  loading: false,
};

export function responseReducer<T>(
  state: ResponseState<T>,
  action: ResponseAction<T>
): ResponseState<T> {
  switch (action.type) {
    case "loading":
      return {
        data: state.data,
        loading: true,
        error: undefined,
      };
    case "success":
      return {
        data: action.payload,
        error: undefined,
        loading: false,
      };
    case "error":
      return {
        data: state.data,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
