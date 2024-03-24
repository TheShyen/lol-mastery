import {defineStore} from "pinia";
import {getItemsFromApi} from "~/services/itemsService";
import type {groupedItems, ItemData, ItemDataFromApi, ItemsTree} from "~/types/ItemsType";

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
  const groupedItems = ref<groupedItems>({
    startItems: [],
    boots: [],
    baseItems: [],
    epicItems: [],
    legendaryItems: [],
    ornnItems: []
  })
  async function getItems() {
    try {
      isLoading.value = true;
      const response = await getItemsFromApi()
      itemTagsTree.value = response.tree
      items.value = reformatData(response.data)
      groupItemsByCategory(items.value)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }
  function getItemById(id: number | string) {
    return items.value.find((item) => item.id == id)
  }
  function groupItemsByCategory(items: ItemData[]) {
    groupedItems.value =  {
      startItems: [],
      boots: [],
      baseItems: [],
      epicItems: [],
      legendaryItems: [],
      ornnItems: []
    }
    items.forEach(item => {
      const {tags, depth, gold, requiredAlly} = item;
      
      const isLaneOrJungle = tags.includes('Lane') || tags.includes('Jungle');
      const isBootsUnder600Gold = tags.includes('Boots') && gold.base < 600;
      const isNotBoots = !tags.includes('Boots');
      const isDepthUnder3 = depth < 3;
      const isGoldUnder2500 = gold.total < 2500;
      
      const isStartItem = (isLaneOrJungle || isBootsUnder600Gold) && !depth;
      if (isStartItem) {
        groupedItems.value.startItems.push(item);
        return;
      }
      
      const isBaseItem = tags.length === 1 && !depth && isNotBoots && gold.base < 2500
      if (isBaseItem) {
        groupedItems.value.baseItems.push(item);
      }
      
      const isEpicItem = isNotBoots && isDepthUnder3 && isGoldUnder2500
      if (isEpicItem) {
        groupedItems.value.epicItems.push(item);
        return;
      }
      
      const isBoot = Boolean(tags.includes('Boots') && depth)
      if (isBoot) {
        groupedItems.value.boots.push(item);
        return;
      }
      
      const isLegendaryItem = Boolean(depth && !requiredAlly)
      if (isLegendaryItem) {
        groupedItems.value.legendaryItems.push(item);
        return;
      }
      
      const isOrnnItem = Boolean(requiredAlly === 'Ornn' && depth)
      if (isOrnnItem) {
        groupedItems.value.ornnItems.push(item);
        return;
      }

    })
  }

  return {
    items,
    groupedItems,
    isLoading,
    getItems,
    getItemById
  }
})