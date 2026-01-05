const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL ?? "";

interface IReq {
  method: string;
  url: string;
  data?: object | string;
  token?: string;
}

export const request = async ({ method, url, data }: IReq) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${DOMAIN}/api/${url}`, options);

  if (response.ok) {
    const result = await response.json();

    return result;
  } else {
    console.error("오류", response.status);
  }
  // const result = await response.json();
  // if (!response.ok) {
  //   console.error("error?: ", result);
  // }

  // return result;
};
