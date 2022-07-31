import { Ref, computed } from "vue";
import type { Item, MultipleSelectStatus } from "./data-table";

export default function useTotalItems(
  items: Ref<Item[]>,
  itemsSelected: Ref<Item[]>
) {
  const toggleSelectItem = (item: Item): void => {
    const index = itemsSelected.value.findIndex(
      (itemSelected) => item.id === itemSelected.id
    );
    if (index !== -1) {
      itemsSelected.value.splice(index, 1);
    } else {
      itemsSelected.value.push(item);
    }
  };

  const multipleSelectStatus = computed((): MultipleSelectStatus => {
    if (itemsSelected.value.length === 0) {
      return "noneSelected";
    }
    if (itemsSelected.value.length === items.value.length) {
      return "allSelected";
    }
    return "partSelected";
  });

  const toggleSelectAll = (isChecked: boolean): void => {
    if (isChecked) {
      itemsSelected.value.splice(0, itemsSelected.value.length);
      totalItems.value.forEach((item) => {
        itemsSelected.value.push(item);
      });
    } else {
      itemsSelected.value.splice(0, itemsSelected.value.length);
    }
  };
  const totalItems = computed((): Item[] => {
    return items.value.map(function (item) {
      const isSelected = !!itemsSelected.value.find((selectItem) => {
        return selectItem.id === item.id;
      });
      return { checkbox: isSelected, ...item };
    });
  });

  return {
    totalItems,
    itemsSelected,
    toggleSelectAll,
    toggleSelectItem,
    multipleSelectStatus,
  };
}
