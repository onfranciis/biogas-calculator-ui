const baseUrl = "http://127.0.0.1:8000";

interface ISend<T> {
  url: string;
  body: object;
  onSuccess: (data: T) => void;
  onError: (data: object) => void;
}

const useRequest = () => {
  const Send = <T,>({ url = "", body = {}, onError, onSuccess }: ISend<T>) => {
    fetch(baseUrl + url, {
      method: "post",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (data) => {
      const res = await data.json();
      if (data.status == 200) {
        return onSuccess(res);
      } else {
        return onError(res);
      }
    });
  };

  return { Send };
};

export default useRequest;
