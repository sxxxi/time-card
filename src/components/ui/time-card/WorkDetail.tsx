import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";
import useDebounce from "../../../hooks/useDebounce";
import { WorkDetailData } from "../../../types/WorkDetailDTO";
import Button from "../../Button";

interface WorkDetailProps {
  data: WorkDetailData;
  onDescriptionChange: (description: string) => void;
}

export default function WorkDetail({
  data,
  onDescriptionChange,
}: WorkDetailProps) {
  return (
    <>
      <div class="flex flex-row">
        <input
          type="text"
          value={data.description}
          onInput={({ currentTarget }) =>
            onDescriptionChange(currentTarget.value)
          }
        />

      </div>
      <div>
        <DropdownSearch
          onSearchChange={(term) => {
            console.log(term);
          }}
          options={[
            { label: "Test", value: "Value" },
            { label: "Test1", value: "Value1" },
          ]}
        />
      </div>
    </>
  );
}

interface DropdownSearchOption {
  value: string;
  label: string;
}

interface DropdownSearchProps {
  options?: Array<DropdownSearchOption>;
  onSearchChange?: (term: string) => void;
}

function DropdownSearch({
  options = [],
  onSearchChange = () => {},
}: DropdownSearchProps) {
  const [search, setSearch] = useDebounce(800);
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  let addButtonRef: SVGSVGElement;
  let ghostRef: HTMLDivElement;

  const [chips, setChips] = createSignal<Array<DropdownSearchOption>>([]);

  const handleSearchInput = (event: { currentTarget: HTMLInputElement }) => {
    setSearch(event.currentTarget.value);
  };

  const handleClickOut = ({ target }: MouseEvent) => {
    if (addButtonRef) {
      setIsOpen(
        addButtonRef.contains(target as HTMLElement) ||
          (ghostRef != undefined && ghostRef.contains(target as HTMLElement)),
      );
    }
  };

  createEffect(() => {
    document.addEventListener("click", handleClickOut);

    onCleanup(() => {
      document.removeEventListener("click", handleClickOut);
    });
  });

  createEffect(() => {
    const searchTerm = search();
    onSearchChange(searchTerm);
  });

  const handleOptionClick = (option: DropdownSearchOption) => {
    setChips((old) => {
      const newOptions = [...old];

      if (newOptions.find((i) => i.value === option.value) == undefined) {
        newOptions.push(option);
      }

      return newOptions;
    });
  };

  const handleDeleteChip = (chip: DropdownSearchOption) => () => {
    setChips((old) => old.filter((i) => i.value !== chip.value));
  };

  return (
    <div class="w-fit transition-transform min-w-50">
      <div class="flex flex-row border border-muted rounded-sm py-2 px-3 items-center gap-3">
        <div class="grow h-8 flex flex-row bg-background text-foreground items-center gap-1">
          <For each={chips()}>
            {(chip) => (
              <DropdownChip chip={chip} onDelete={handleDeleteChip(chip)} />
            )}
          </For>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-5 cursor-pointer"
          ref={addButtonRef}
        >
          <path
            fill-rule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <Show when={isOpen()}>
        <div
          ref={ghostRef}
          class="bg-slate-50 text-slate-950 rounded-sm mt-2 absolute min-w-80 min-h-20 p-4 flex flex-col border border-muted shadow-sm"
        >
          <input
            class="border border-slate-300 rounded-sm h-7"
            onInput={handleSearchInput}
          />
          <div>
            <For each={options}>
              {({ label, value }) => (
                <DropdownOption
                  value={value}
                  label={label}
                  onClick={handleOptionClick}
                />
              )}
            </For>
          </div>
        </div>
      </Show>
    </div>
  );
}

interface DropdownOptionProps {
  value: string;
  label: string;
  onClick?: (option: DropdownSearchOption) => void;
}

function DropdownOption({
  value,
  label,
  onClick = () => {},
}: DropdownOptionProps) {
  const handleClick = () => {
    onClick({
      label,
      value,
    });
  };

  return (
    <div
      data-value={value}
      class="p-2 m-1 rounded-sm bg-slate-200 hover:bg-slate-300 transition-colors cursor-pointer select-none"
      onClick={handleClick}
    >
      {label}
    </div>
  );
}

interface DropdownChipProps {
  chip: DropdownSearchOption;
  onDelete?: () => void;
}

function DropdownChip({ chip, onDelete = () => {} }: DropdownChipProps) {
  return (
    <div class="flex flex-row bg-primary text-sm text-primary-fg rounded-md pl-4 pr-3 h-8 items-center">
      {chip.label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 pl-2"
        onClick={onDelete}
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  );
}
