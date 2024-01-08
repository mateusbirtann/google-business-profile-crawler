import { getBusinessData } from '../services/getBusinessData';

export async function searchBusinesses(query: string) {
  const start = Date.now();
  const data = await getBusinessData(query);
  const end = Date.now();
  console.log(`time in seconds ${Math.floor((end - start) / 1000)}`);
  return data;
}