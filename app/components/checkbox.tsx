import classNames from "classnames";
import { useField } from "remix-validated-form";

export const Checkbox = ({
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
    <div className="flex items-center">
      <label htmlFor={name}>{title}</label>
      <input
        type="checkbox"
        {...field.getInputProps()}
        className={classNames("ml-2 w-4 h-4")}
        name={name}
        id={id ? id : name}
      />
    </div>
  );
};
