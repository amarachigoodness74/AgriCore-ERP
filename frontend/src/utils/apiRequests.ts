/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = import.meta.env.VITE_API_URL;

export const postOrPutData = async <T, R = any>(
  url: string,
  data: T,
  operation: "POST" | "PUT" = "POST"
): Promise<R> => {
  try {
    const result = await fetch(`${API_URL}/${url}`, {
      method: operation,
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return result.json() as Promise<R>; // Cast to the expected response type
  } catch (error) {
    console.log(error);
    return { errors: "Sorry, there was an error" } as unknown as R;
  }
};
