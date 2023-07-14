/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Checkbox,
  Text,
  Select,
  Stack,
  TextInput,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useEffect } from "react";

type Column = {
  label: string;
  type: "text" | "number" | "select" | "date" | "empty";
  searchTerm: string;
  inputProps?: any;
};

export type TableHeaderProps = {
  onCheckAll?: (checked: boolean) => void;
  columns: Column[];
  onValueChange: (value: any) => void;
};

export function TableHeader({
  onCheckAll,
  columns,
  onValueChange,
}: TableHeaderProps) {
  const form = useForm();

  useEffect(() => {
    if (!columns || !form) return;

    columns.forEach((col) => {
      if (col.type === "select") {
        form.setFieldValue(col.searchTerm, "");
      }

      if (col.type === "text") {
        form.setFieldValue(col.searchTerm, "");
      }

      if (col.type === "number") {
        form.setFieldValue(col.searchTerm, "");
      }

      if (col.type === "date") {
        form.setFieldValue(col.searchTerm, new Date());
      }

      form.reset();
    });
  }, []);

  function submit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    onValueChange(form.values);
  }

  function clearField(field: string) {
    form.setFieldValue(field, "");
    form.setDirty({ [field]: false });
    onValueChange({ ...form.values, [field]: "" });
  }

  function onBlur(field: string) {
    console.log("blur", field);
    const val = form.values[field];
    console.log(val);

    if (typeof val === "string") {
      if (val.trim()) {
        console.log("we");
      }
    }

    form.getInputProps(field).onBlur();
  }

  return (
    <tr>
      {onCheckAll && (
        <th>
          <Checkbox onChange={(e) => onCheckAll(e.target.checked)} />
        </th>
      )}
      {columns.map((col, inx) =>
        col.type === "empty" ? (
          <th key={inx}></th>
        ) : (
          <th key={col.label}>
            <Stack spacing={7}>
              <Text color="gray.7" size="sm" weight={700}>
                {col.label}
              </Text>

              {col.type === "select" && (
                <Select
                  size="sm"
                  placeholder="Pesquisar"
                  data={[
                    { label: "Tudo", value: undefined },
                    ...(col.inputProps?.data ?? []),
                  ]}
                  {...form.getInputProps(col.searchTerm)}
                  onChange={(val) => {
                    form.getInputProps(col.searchTerm).onChange(val);
                    onValueChange({
                      ...form.values,
                      [col.searchTerm]: val,
                    });
                  }}
                />
              )}
              {col.type === "text" && (
                <TextInput
                  size="sm"
                  placeholder="Pesquisar"
                  {...form.getInputProps(col.searchTerm)}
                  onKeyDown={submit}
                  onBlur={() => onBlur(col.searchTerm)}
                  rightSection={
                    form.isDirty(col.searchTerm) && (
                      <ActionIcon
                        color="red"
                        size="xs"
                        onClick={() => clearField(col.searchTerm)}
                      >
                        <IconX />
                      </ActionIcon>
                    )
                  }
                />
              )}
              {col.type === "number" && (
                <NumberInput
                  size="sm"
                  placeholder="Pesquisar"
                  onKeyDown={submit}
                  hideControls
                  {...form.getInputProps(col.searchTerm)}
                  rightSection={
                    form.isDirty(col.searchTerm) && (
                      <ActionIcon
                        color="red"
                        size="xs"
                        onClick={() => clearField(col.searchTerm)}
                      >
                        <IconX />
                      </ActionIcon>
                    )
                  }
                />
              )}
            </Stack>
          </th>
        )
      )}
    </tr>
  );
}
