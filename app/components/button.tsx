import classNames from "classnames";
import { ComponentProps } from "react";

export const buttonVariants = {
  primary: "bg-black rounded-md p-2 w-64 text-white shadow text-center",
  secondary: "bg-white rounded-md p-2 w-64 text-black shadow text-center",
  neutral: "bg-gray-200 rounded-md p-2 w-64 text-black shadow text-center",
};

type ButtonProps = {
  variant: keyof typeof buttonVariants;
} & ComponentProps<"button">;

export const Button = ({ variant, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={classNames(buttonVariants[variant], rest.className)}
    ></button>
  );
};
