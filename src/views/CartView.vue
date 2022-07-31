<script setup lang="ts">
import useCart from "@/hooks/useCart";
import { ICartItem, IHeader } from "@/type";
import { computed } from "vue";
import { ref } from "vue";
import DataTable from "../common/data-table/DataTable.vue";
import AddCartItemVue from "../components/cart/AddCartItem.vue";
const { cartList, deleteItem, deleteSelected } = useCart();

const headers: IHeader[] = [
  {
    text: "商品名称",
    value: "name",
  },
  {
    text: "数量",
    value: "count",
  },
  {
    text: "单价",
    value: "price",
  },
  {
    text: "操作项",
    value: "action",
  },
];
const itemsSelected = ref<ICartItem[]>([]);
const currentItem = ref<ICartItem>();
const currentItemCount = ref<number>(0);

const selectItemLength = computed(() => {
  return itemsSelected.value.length;
});

const editItem = (val: ICartItem) => {
  currentItem.value = val;
  currentItemCount.value = val.count;
  showEditModal();
};

const confirmEdit = () => {
  if (currentItem.value) {
    currentItem.value.count = currentItemCount.value;
    cartList.value.forEach((item) => {
      if (item.id === currentItem.value?.id) {
        item.count = currentItemCount.value;
      }
    });
    closeEditModal();
  }
};

const isShowEditModal = ref(false);

function showEditModal() {
  isShowEditModal.value = true;
}

function closeEditModal() {
  currentItem.value = undefined;
  isShowEditModal.value = false;
}
</script>

<template>
  <div class="cart-page">
    <Modal v-model="isShowEditModal" :close="closeEditModal">
      <div class="modal">
        <div class="form-item">
          <label>数量</label>
          <input type="number" v-model.trim="currentItemCount" />
        </div>
        <button @click="confirmEdit">确认</button>
        <button @click="closeEditModal">取消</button>
      </div>
    </Modal>
    <div class="operations">
      <AddCartItemVue></AddCartItemVue>
      <button
        class="remove-button"
        :disabled="selectItemLength === 0"
        @click="deleteSelected(itemsSelected)"
      >
        删除
      </button>
    </div>
    <DataTable
      :headers="headers"
      :items="cartList"
      v-model:items-selected="itemsSelected"
    >
      <template #action="item">
        <div class="operation-wrapper">
          <img
            src="../components/cart/delete.png"
            class="operation-icon"
            @click="deleteItem(item)"
          />
          <img
            src="../components/cart/edit.png"
            class="operation-icon"
            @click="editItem(item)"
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>
<style lang="scss">
.operations {
  display: flex;
}
.remove-button {
  margin-left: 10px;
}

.operation-wrapper {
  img {
    width: 20px;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
