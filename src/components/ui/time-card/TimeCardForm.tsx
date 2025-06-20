import { createEffect } from "solid-js";
import { useTimeCardData } from "../../../contexts/TimeCardDataContext";
import { WorkDetails } from "./WorkDetails";

export default function TimeCardForm() {
  const [data, setData] = useTimeCardData();

  const handleDateChange = (currentTarget: HTMLInputElement) => {
    setData("date", currentTarget.value);
    // console.log(new Date(currentTarget.value));
  };

  const getTimeString = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getDateString = (date: Date) => {
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString().padStart(2, "0");
    const dat = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${dat}`;
  }

  createEffect(() => {
    console.log(data.date);
  }, [data.date]);

  return (
    <form class="bg-background text-foreground">
      <div class="flex flex-row gap-8 items-start justify-start">
        <span>
          Date:{" "}
          <input
            type="date"
            value={data.date}
            onInput={({ currentTarget }) => {
              handleDateChange(currentTarget);
            }}
          />
        </span>
        <span>
          Time:{" "}
          <input
            type="time"
            value={data.startTime}
            onInput={({ currentTarget }) => {
            }}
          />
          {" ~ "}
          <input
            type="time"
            value={data.endTime}
            onInput={({ currentTarget }) => {
            }}
          />
        </span>
      </div>
      <WorkDetails />
      Summary: <input type="text" value={data.summary} />
    </form>
  );
}
