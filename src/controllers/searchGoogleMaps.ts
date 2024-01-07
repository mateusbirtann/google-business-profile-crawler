import { Business } from '../entities/Business';
import { searchBusinesses } from '../useCases/searchBusinesses';

export async function searchGoogleMaps() {
  try {
    const businesses: Business[] = await searchBusinesses() as Business[];
    return businesses;
  } catch (error) {
    console.log("error at googleMaps", (error as Error).message);
  }
}