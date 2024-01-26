import {getActualGameVersion} from "~/services/getActualGameVersion";

export const version = async () => await getActualGameVersion()