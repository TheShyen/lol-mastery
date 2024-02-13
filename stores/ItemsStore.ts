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
      if (groupedItems.value) {
        const { tags, depth, gold, requiredAlly } = item;

        const isLaneOrJungle = tags.includes('Lane') || tags.includes('Jungle');
        const isBootsUnder600Gold = tags.includes('Boots') && gold.base < 600;
        const isNotBoots = !tags.includes('Boots');
        const isDepthUnder3 = depth < 3;
        const isGoldUnder2500 = gold.total < 2500;

        if ((isLaneOrJungle || isBootsUnder600Gold) && !depth) {
          // Предмет начальной стадии
          groupedItems.value.startItems.push(item);
        } else if (tags.length === 1 && !depth && isNotBoots && gold.base < 2500) {
          // Базовые предметы
          groupedItems.value.baseItems.push(item);
        } else if (isNotBoots && isDepthUnder3 && isGoldUnder2500) {
          // Эпические предметы
          groupedItems.value.epicItems.push(item);
        } else if (tags.includes('Boots') && depth) {
          // Предметы обуви
          groupedItems.value.boots.push(item);
        } else if (depth && !requiredAlly) {
          // Легендарные предметы
          groupedItems.value.legendaryItems.push(item);
        } else if (requiredAlly === 'Ornn' && depth) {
          // Предметы, требующие союзника Ornn
          groupedItems.value.ornnItems.push(item);
        }
      }
    })
  }

  return {
    items,
    groupedItems,
    isLoading,
    getItems
  }
})