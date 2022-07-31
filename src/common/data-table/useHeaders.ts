import { Ref, computed } from "vue";
import type { Header } from "./data-table";
export default function useHeaders(headers: Ref<Header[]>) {
  const headerColumns = computed((): string[] =>
    headers.value.map((header) => header.value)
  );
  const headersForRender = computed((): string[] =>
    headers.value.map((header) => header.text)
  );

  return {
    headerColumns,
    headersForRender,
  };
}
