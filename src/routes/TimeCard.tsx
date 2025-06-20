import TimeCardForm from "../components/ui/time-card/TimeCardForm";
import { TimeCardDataProvider } from "../contexts/TimeCardDataContext";

// Clean component without provider logic
export default function TimeCard() {
  return (
    <TimeCardDataProvider>
      <div class="m-8">
        <h1 class="text-5xl font-bold">勤怠入力</h1>
        <TimeCardForm />
      </div>
    </TimeCardDataProvider>
  );
}

