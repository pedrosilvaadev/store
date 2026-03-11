export const apiFetch = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api${url}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "API request failed");
  }

  return response.json();
};
