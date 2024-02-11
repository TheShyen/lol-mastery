import {defineStore} from "pinia";
import {getItemsFromApi} from "~/services/itemsService";
import type {ItemData, ItemDataFromApi, ItemsTree} from "~/types/ItemsType";

function reformatData(data: Record<string,ItemDataFromApi>): ItemData[] {
  return Object.keys(data).map(key => {
    return {
      ...data[key],
      id: key
    }
  }).filter(item => item.gold.purchasable && !item.requiredChampion)
}
export const useItemStore = defineStore('items', () => {

  const isLoading = ref(false)
  const items = ref<ItemData[]>([])
  const itemTagsTree = ref<ItemsTree[]>([])
  const startItems = []
  async function getItems() {
    try {
      isLoading.value = true;
      const response = await getItemsFromApi()
      itemTagsTree.value = response.tree
      items.value = reformatData(response.data)
      itemsSort(items.value)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
  function itemsSort(items: ItemData[]) {
    startItems.value = items.filter(item => (item.tags.includes('Lane') || item.tags.includes('Jungle')) && !item.depth)

    console.log(startItems.value)

  }

  return {
    items,
    isLoading,
    getItems
  }
})