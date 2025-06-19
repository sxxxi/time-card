import { createEffect } from "solid-js";
import { useTimeCardData } from "../../../contexts/TimeCardDataContext";
import { WorkDetails } from "./WorkDetails";

export default function TimeCardForm() {
  const [data, setData] = useTimeCardData();

  const handleDateChange = (currentTarget: HTMLInputElement) => {
    setData("date", currentTarget.value);
  };

  createEffect(() => {
    console.log(JSON.stringify(data));
  }, [data.date]);

  return (
    <form>
      Date:{" "}
      <input
        type="text"
        value={data.date}
        onInput={({ currentTarget }) => {
          handleDateChange(currentTarget);
        }}
      />
      <WorkDetails />
      Summary: <input type="text" value={data.summary} />
    </form>
  );
}
