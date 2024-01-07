import { getBusinessData } from '../gateways/getBusinessData';

export async function searchBusinesses() {
  const start = Date.now();
  const data = await getBusinessData();
  const end = Date.now();
  console.log(`time in seconds ${Math.floor((end - start) / 1000)}`);
  return data;
}