const DOMAIN = "http://localhost:3000";

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
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`/api/${url}`, options);
    if (response.status === 200) {
      const result = await response.json();

      return result;
    } else {
      console.error("전송오류");
    }
  } catch (err) {
    console.error(err);
  }
};
