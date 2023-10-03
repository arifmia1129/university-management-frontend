import { Select } from "antd";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

type Item = { value: string; label: string };

interface IInput {
  name: string;
  size?: "large" | "small";
  defaultValue?: string;
  label?: string;
  items: Item[];
}

const FormSelectField = ({
  name,
  size,
  defaultValue,
  label,
  items,
}: IInput) => {
  const { control } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            defaultValue={defaultValue}
            size={size}
            onChange={onChange}
            options={items}
            value={value}
            style={{ width: "100%" }}
            placeholder="Select"
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
