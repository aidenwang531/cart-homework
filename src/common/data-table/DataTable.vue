<script setup lang="ts">
import { toRefs, PropType, useSlots } from "vue";
import MultipleCheckBox from "../checkbox/MultipleCheckBox.vue";
import SingleCheckBox from "../checkbox/SingleCheckBox.vue";
import useHeaders from "./useHeaders";
import useTotalItems from "./useTotalItems";
import type { Header, Item } from "./data-table";

const props = defineProps({
  headers: {
    type: Array as PropType<Header[]>,
    required: true,
  },
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  itemsSelected: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
});

const { headers, items, itemsSelected } = toRefs(props);
const slots = useSlots();
const { headerColumns, headersForRender } = useHeaders(headers);
const { totalItems, toggleSelectAll, toggleSelectItem, multipleSelectStatus } =
  useTotalItems(items, itemsSelected);
</script>

<template>
  <div class="the-data-table-table">
    <div class="the-data-table-table__main">
      <table>
        <thead class="the-data-table-table__header">
          <tr>
            <th>
              <MultipleCheckBox
                :status="multipleSelectStatus"
                @change="toggleSelectAll"
              />
            </th>

            <th v-for="(header, index) in headersForRender" :key="index">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="the-data-table-table__body">
          <template v-for="item in totalItems" :key="item.id">
            <tr>
              <td>
                <SingleCheckBox
                  :checked="item.checkbox"
                  @change="toggleSelectItem(item)"
                />
              </td>
              <td v-for="column in headerColumns" :key="column">
                <slot
                  v-if="slots[`${column}`]"
                  :name="`${column}`"
                  v-bind="item"
                />
                <template v-else>
                  {{ item[column] }}
                </template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
