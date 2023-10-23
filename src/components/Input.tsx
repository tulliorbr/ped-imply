import masks from "@/utils/masks";
import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  useCallback,
} from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  register: UseFormRegister<any>;
  title?: string;
  error?: string;
  required?: boolean;
  maskType?: "cpf" | "cep" | "phone" | "onlyNumbers" | "onlyLetters";
}

const Input: FC<InputProps> = ({
  register,
  onChange,
  id,
  title,
  error,
  required,
  maskType,
  ...rest
}) => {
  const applyMask = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (maskType) {
        const maskedValue = masks[maskType](event.target.value);
        event.target.value = maskedValue;
      }
      if (onChange) onChange(event);
    },
    [maskType, onChange]
  );
  return (
    <div className="mb-[20px] relative">
      <label
        className="block text-fontColor text-sm mb-[7px] gap-1"
        htmlFor={id}
      >
        {title}
        {required ? "*" : ""}
      </label>
      <div>
        <input
          {...rest}
          {...register(id)}
          name={id}
          id={id}
          onChange={applyMask}
          className={`appearance-none border rounded w-full h-[45px] px-1 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? "border-red-500" : "border-gray-700"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-0 absolute">{error}</p>}
    </div>
  );
};

export default Input;
