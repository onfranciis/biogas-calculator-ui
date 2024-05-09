import { FormEvent, useState } from "react";
import useRequest from "../hooks/useRequest";

interface IResult {
  percentage_of_protein: string;
}

const Protein = () => {
  const { Send } = useRequest();
  const [inputOne, setInputOne] = useState("");
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    percentage_of_nitrogen: inputOne || 0,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    Send<IResult>({
      url: "/calculate_percentage_of_protein/",
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
        <p className="heading">Calculate percentage of protein</p>

        <label htmlFor="wf">
          <p>Percentage of Nitrogen</p>
          <input
            type="number"
            id="wf"
            name="wf"
            placeholder="percentage of nitrogen"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" name="submit_button" />

        {result && (
          <p className="result">
            The percentage of protein is {result.percentage_of_protein}
          </p>
        )}
        {error}
      </form>
    </div>
  );
};

export default Protein;
