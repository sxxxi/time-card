import { createContext, JSX, useContext } from "solid-js";
import { TimeCardData } from "../types/TimeCardDataDTO";
import { createStore, SetStoreFunction } from "solid-js/store";

const TimeCardDataContext =
  createContext<
    [data: TimeCardData, setData: SetStoreFunction<TimeCardData>]
  >();

interface TimeCardDataProviderProps {
  children: JSX.Element;
}

export function TimeCardDataProvider(props: TimeCardDataProviderProps) {
  const ctx = createStore<TimeCardData>({
    date: (new Date()).toLocaleDateString('en-CA'),
    startTime: "09:00",
    endTime: "18:00",
    workDetails: [{ description: "Hello?" }],
    summary: "this is the summary",
  });

  return (
    <TimeCardDataContext.Provider value={ctx}>
      {props.children}
    </TimeCardDataContext.Provider>
  );
}

export function useTimeCardData() {
  return useContext(TimeCardDataContext);
}
