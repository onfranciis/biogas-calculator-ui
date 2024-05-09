import { FormEvent, useState } from "react";
import useRequest from "../hooks/useRequest";

interface IResult {
  percentage_of_fat: string;
}

const Fat = () => {
  const { Send } = useRequest();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [inputFour, setInputFour] = useState("");
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    weight_of_flask: inputOne || 0,
    weight_of_oil: inputTwo || 0,
    weight_of_empty_flask: inputThree || 0,
    weight_of_sample: inputFour || 0,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    Send<IResult>({
      url: "/calculate_percentage_of_fat/",
      body,
      onSuccess: (data) => {
        console.log(data);
        setResult(data);
      },
      onError: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <div className="FormComponent">
      <form id="form" onSubmit={handleSubmit}>
        <p className="heading">Calculate percentage of fat</p>

        <label htmlFor="wf">
          <p>Weight of flask</p>
          <input
            type="number"
            id="wf"
            name="wf"
            placeholder="weight of flask"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>
        <label htmlFor="wo">
          <p>Weight of oil</p>
          <input
            type="number"
            id="wo"
            name="wo"
            placeholder="weight of oil"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
        </label>

        <label htmlFor="wef">
          <p>Weight of empty flask</p>
          <input
            type="number"
            id="wef"
            name="wef"
            placeholder="weight of empty flask"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
          />
        </label>

        <label htmlFor="ws">
          <p>Weight of sample</p>
          <input
            type="number"
            id="ws"
            name="ws"
            placeholder="weight of sample"
            value={inputFour}
            onChange={(e) => setInputFour(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" name="submit_button" />

        {result && (
          <p className="result">
            The percentage of fat is {result.percentage_of_fat}
          </p>
        )}
        {error}
      </form>
    </div>
  );
};

export default Fat;
