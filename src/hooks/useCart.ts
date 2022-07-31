import { ICartItem } from "@/type";
import { ref } from "vue";

const cartList = ref<ICartItem[]>([
  {
    id: 1,
    count: 2,
    name: "商品1",
    price: "10.00",
  },
  {
    id: 2,
    count: 2,
    name: "商品2",
    price: "11.00",
  },
  {
    id: 3,
    count: 2,
    name: "商品3",
    price: "13.00",
  },
  {
    id: 4,
    count: 2,
    name: "商品4",
    price: "14.00",
  },
]);
export default function useCart() {
  const addToCart = (cartItem: ICartItem) => {
    cartList.value.push(cartItem);
  };

  const deleteItem = (val: ICartItem) => {
    cartList.value = cartList.value.filter((item) => item.id !== val.id);
  };

  const deleteSelected = (itemsSelected: ICartItem[]) => {
    cartList.value = cartList.value.filter((item) => {
      return !itemsSelected.find((selectedItem) => selectedItem.id === item.id);
    });
    itemsSelected = [];
  };

  return {
    cartList,
    addToCart,
    deleteSelected,
    deleteItem,
  };
}
