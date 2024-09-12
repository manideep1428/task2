import React from "react";
import { useTheme } from "@chakra-ui/react";
import FromWrapper from "./FormWrapper";
import { IFormInputProps } from "@src/interface/forms";
import dynamic from 'next/dynamic';
import type { Props } from "react-select";

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface IFormSelectProps 
  extends Omit<IFormInputProps, "inputProps" | "type" | "onChange" | "onBlur"> {
  options: { label: string; value: string }[] | any
  selectProps?: Props
  onChange?: any
  onBlur?: any
}

export default function FormSelect({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  selectProps = {},
  children,
  helperText,
  wrapperProps = {},
  options,
}: IFormSelectProps) {
  const theme = useTheme();

  const handleChange = (selectedOption: any) => {
    onChange && onChange(name, selectedOption?.value);
  };

  const handleBlur = () => {
    onBlur && onBlur(name, true);
  };

  return (
    <FromWrapper
      isInvalid={Boolean(error && touched)}
      wrapperProps={wrapperProps}
      helperText={helperText}
      label={label}
      error={error as string}
      touched={touched}
    >
      <ReactSelect
        name={name}
        placeholder={placeholder}
        value={options.find((item: { value: string }) => item?.value === value)}
        onChange={handleChange}
        onBlur={handleBlur}
        options={options}
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
            minWidth: "none",
            backgroundColor: "white",
            height: "auto",
            maxHeight: "none",
            minHeight: "none",
            position: "relative",
          }),
          control: (base, { isFocused }) => ({
            ...base,
            width: "100%",
            minWidth: "272px",
            height: "45px",
            border: isFocused
              ? `1px solid ${theme.colors.primary}`
              : error
              ? `1px solid ${theme.colors.errorRed}`
              : "1px solid #c0bcd7",
            backgroundColor: theme.colors.inputBg,
            borderRadius: "10px",
            fontSize: ".875rem",
            fontWeight: "500",
            "&:hover": {
              border: `1px solid ${theme.colors.primary}`,
            },
          }),
          valueContainer: (base) => ({
            ...base,
            paddingLeft: "20px",
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            fontSize: ".875rem",
            fontWeight: "500",
            backgroundColor: isSelected
               ? theme.colors.primary
               : isFocused
               ? `${theme.colors.primary}20`
               : "white",
            color: isSelected ? "blue" : "black",
            "&:active": {
              backgroundColor: theme.colors.primary,
            },
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
            position: "absolute",
            width: "100%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
        menuPosition="fixed"
        {...selectProps}
      />
      {children}
    </FromWrapper>
  );
}