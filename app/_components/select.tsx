"use client";

import { FC } from "react";
import { Label } from "@/components/ui/label";
import ReactSelect, { ActionMeta, MultiValue } from "react-select";
import makeAnimated from "react-select/animated";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label?: string;
  value?: Option[];
  onChange: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  options: Option[];
  disabled?: boolean;
}

const Select: FC<Props> = ({ disabled, onChange, options, label, value }) => {
  const animatedComponents = makeAnimated();

  return (
    <div className="z-[100]">
      <Label
        className="
        block
        text-sm
        font-medium
        leading-6
        text-gray-900
        "
      >
        {label}
      </Label>
      <div className="mt-2">
        <ReactSelect
          components={animatedComponents}
          isDisabled={disabled}
          defaultValue={value}
          onChange={onChange}
          options={options}
          isMulti
          // menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{ control: () => "text-sm" }}
        />
      </div>
    </div>
  );
};

export default Select;
