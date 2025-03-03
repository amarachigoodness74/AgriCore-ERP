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
    return result.json() as Promise<R>;
  } catch (error) {
    console.log(error);
    return { errors: "Sorry, there was an error" } as unknown as R;
  }
};

export const getData = async (url: string) => {
  try {
    const res = await fetch(`${API_URL}/${url}`);
    return res.json();
  } catch (error: any) {
    return error.message;
  }
};

export const deleteData = async (id: string, url: string) => {
  const res = await fetch(`${API_URL}/${url}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
