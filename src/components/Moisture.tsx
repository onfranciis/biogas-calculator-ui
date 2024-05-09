import { FormEvent, useState } from "react";
import useRequest from "../hooks/useRequest";

interface IResult {
  percentage_of_moisture: string;
}

const Moisture = () => {
  const { Send } = useRequest();
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree, setInputThree] = useState("");
  const [result, setResult] = useState<IResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const body = {
    weight_of_crucible: inputOne || 0,
    weight_of_sample: inputTwo || 0,
    weight_of_drymatter: inputThree || 0,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setResult(null);

    if (Object.values(body).includes(0)) {
      return setError("No value should be empty or zero");
    }

    Send<IResult>({
      url: "/calculate_percentage_of_moisture/",
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
        <p className="heading">Calculate percentage of moisture</p>

        <label htmlFor="wf">
          <p>Weight of crucible</p>
          <input
            type="number"
            id="wf"
            name="wf"
            placeholder="weight of crucible"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
        </label>
        <label htmlFor="wo">
          <p>Weight of sample</p>
          <input
            type="number"
            id="wo"
            name="wo"
            placeholder="weight of sample"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
        </label>

        <label htmlFor="wef">
          <p>Weight of dry matter</p>
          <input
            type="number"
            id="wef"
            name="wef"
            placeholder="weight of dry matter"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" name="submit_button" />

        {result && (
          <p className="result">
            The percentage of moisture is {result.percentage_of_moisture}
          </p>
        )}
        {error}
      </form>
    </div>
  );
};

export default Moisture;
