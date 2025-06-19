import { WorkDetailData } from "../../../types/WorkDetailDTO";

interface WorkDetailProps {
  data: WorkDetailData;
  onDescriptionChange: (description: string) => void;
}

export default function WorkDetail({
  data,
  onDescriptionChange,
}: WorkDetailProps) {
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
