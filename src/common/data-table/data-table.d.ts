export type Item = Record<string, unknown>;

export type Header = {
  text: string;
  value: string;
};
export type MultipleSelectStatus =
  | "allSelected"
  | "noneSelected"
  | "partSelected";

export type EmitsEventName = "update:itemsSelected";
