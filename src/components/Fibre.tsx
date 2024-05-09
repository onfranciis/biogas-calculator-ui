import { FormEvent, useState } from "react";
import useRequest from "../hooks/useRequest";

interface IResult {
  percentage_of_fibre: string;
}

const Fibre = () => {
  const { Send } = useRequest();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    weight_of_dryresidue: inputOne || 0,
    weight_of_ash: inputTwo || 0,
    weight_of_sample: inputThree || 0,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    Send<IResult>({
      url: "/calculate_percentage_of_fibre/",
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
        <p className="heading">Calculate percentage of fibre</p>

        <label htmlFor="wf">
          <p>Weight of dry residue</p>
          <input
            type="number"
            id="wf"
            name="wf"
            placeholder="weight of dry residue"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>

        <label htmlFor="wo">
          <p>Weight of fibre</p>
          <input
            type="number"
            id="wo"
            name="wo"
            placeholder="weight of fibre"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
        </label>

        <label htmlFor="ws">
          <p>Weight of sample</p>
          <input
            type="number"
            id="ws"
            name="ws"
            placeholder="weight of sample"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" name="submit_button" />

        {result && (
          <p className="result">
            The percentage of fibre is {result.percentage_of_fibre}
          </p>
        )}
        {error}
      </form>
    </div>
  );
};

export default Fibre;
