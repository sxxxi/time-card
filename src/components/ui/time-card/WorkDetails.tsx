import { For } from "solid-js";
import { useTimeCardData } from "../../../contexts/TimeCardDataContext";
import WorkDetail from "./WorkDetail";

export function WorkDetails() {
  const [data, setData] = useTimeCardData();

  const handleDescriptionChange = (index: number) => (value: string) => {
    setData("workDetails", index, "description", value);
  };

  return (
    <For each={data.workDetails}>
      {(detail, index) => (
        <WorkDetail
          data={detail}
          onDescriptionChange={handleDescriptionChange(index())}
        />
      )}
    </For>
  );
}
