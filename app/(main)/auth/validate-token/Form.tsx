import { PinInput } from "./PinInput";

interface FormProps {
  token: string;
}

export default function Form({ token }: FormProps) {
  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput length={6} token={token} />
    </div>
  );
}
