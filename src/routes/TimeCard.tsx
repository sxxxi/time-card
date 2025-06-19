import { createStore, SetStoreFunction } from "solid-js/store";
import {
  createContext,
  createEffect,
  For,
  JSX,
  Setter,
  useContext,
} from "solid-js";

interface WorkDetailData {
  description: string;
}

interface TimeCardData {
  date: string;
  workDetails: Array<WorkDetailData>;
  summary: string;
}

const TimeCardDataContext =
  createContext<
    [data: TimeCardData, setData: SetStoreFunction<TimeCardData>]
  >();

interface TimeCardDataProviderProps {
  children: JSX.Element;
}

// Provider wrapper component
function TimeCardProvider(props: TimeCardDataProviderProps) {
  const foo = createStore<TimeCardData>({
    date: "this is the date",
    workDetails: [
      {description: "Hello?"}
    ],
    summary: "this is the summary",
  });

  return (
    <TimeCardDataContext.Provider value={foo}>
      {props.children}
    </TimeCardDataContext.Provider>
  );
}

// Clean component without provider logic
export default function TimeCard() {
  return (
    <TimeCardProvider>
      <h1 class="text-5xl font-bold">勤怠入力</h1>
      <TimeCardForm />
    </TimeCardProvider>
  );
}

function TimeCardForm() {
  const [data, setData] = useContext(TimeCardDataContext);

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

interface WorkDetailProps {
  data: WorkDetailData;
  onDescriptionChange: (description: string) => void;
}

function WorkDetails() {
  const [data, setData] = useContext(TimeCardDataContext);

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

function WorkDetail({ data, onDescriptionChange }: WorkDetailProps) {
  return (
    <div>
      <input
        type="text"
        value={data.description}
        onInput={({ currentTarget }) =>
          onDescriptionChange(currentTarget.value)
        }
      />
      <input type="text" value={data.description} disabled />
    </div>
  );
}
