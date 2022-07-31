<script setup lang="ts">
import useCart from "@/hooks/useCart";
import { ICartItem } from "@/type";
import { ref } from "vue";
const { addToCart } = useCart();
const isShowAddModal = ref(false);
const newItemName = ref("");
const newItemNumber = ref<number>();
const newItemPrice = ref("");
function showAddModal() {
  isShowAddModal.value = true;
}

function closeAddModal() {
  isShowAddModal.value = false;
}
function resetForm() {
  newItemName.value = "";
  newItemNumber.value = undefined;
  newItemPrice.value = "";
}
const confirmAdd = () => {
  const newItem: ICartItem = {
    id: Math.random(),
    count: newItemNumber.value || 0,
    name: newItemName.value,
    price: newItemPrice.value,
  };
  addToCart(newItem);
  closeAddModal();
  resetForm();
};
</script>

<template>
  <div class="cart-list">
    <button @click="showAddModal">添加</button>
    <Modal v-model="isShowAddModal" :close="closeAddModal">
      <div class="modal">
        <label>新增</label>
        <div class="form-item">
          <label>名称</label>
          <input type="text" v-model.trim="newItemName" />
        </div>
        <div class="form-item">
          <label>数量</label>
          <input min="1" type="number" v-model.trim="newItemNumber" />
        </div>
        <div class="form-item">
          <label>单价</label>
          <input type="text" v-model.trim="newItemPrice" />
        </div>
        <button @click="confirmAdd">确认</button>
        <button @click="closeAddModal">取消</button>
      </div>
    </Modal>
  </div>
</template>
