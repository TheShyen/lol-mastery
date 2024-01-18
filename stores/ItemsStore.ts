import {defineStore} from "pinia";
import {getItemsFromApi} from "~/services/itemsService";
import type {ItemData, ItemDataFromApi} from "~/types/ItemsType";

function reformatData(data: Record<string,ItemDataFromApi>): ItemData[] {
  return Object.keys(data).map(key => {
    return {
      ...data[key],
      id: key
    }
  })
}
export const useItemStore = defineStore('items', () => {

  const isLoading = ref(false)
  const items = ref<ItemData[]>([])
  async function getItems() {
    try {
      isLoading.value = true;
      const response = await getItemsFromApi()
      items.value = reformatData(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }


  return {
    isLoading,
    getItems
  }
})