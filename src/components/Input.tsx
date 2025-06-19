import { JSX } from "solid-js";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input(props: InputProps) {
  return <div>
    {props.label ?? ""}
    <input {...(props as JSX.InputHTMLAttributes<HTMLInputElement>)} class="bg-white text-white" />
  </div>
}
