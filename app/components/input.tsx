import classNames from "classnames";
import { useField } from "remix-validated-form";

export const Input = ({
  name,
  title,
  id,
}: {
  name: string;
  title?: string;
  id?: string;
}) => {
  const field = useField(name);

  return (
    <div className={"flex flex-col w-full"}>
      <label htmlFor={name}>{title}</label>
      <input
        {...field.getInputProps()}
        className={classNames("border-2 rounded-md", {
          "border-2 !border-red-500": field.error,
        })}
        name={name}
        id={id ? id : name}
      />
    </div>
  );
};
