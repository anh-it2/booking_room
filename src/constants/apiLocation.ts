import { baseUrl } from "@/config/baseUrl";
import { getApi } from "@/lib/apiFetch";
import { matchSorter } from "match-sorter";

export type Location = {
    id:  number,
    name: string,
    address: string,
    description: string,
    city: string,
    country: string,
    postalCode: string,
    active: boolean,
    createdAt: string,
    updatedAt: string
}

export const initData = {
    records: [] as Location[],

    async initialize() {
    const sampleProducts: Location[] = [];
    async function generateRandomProductData(){
      const res = await getApi(`${baseUrl}/api/locations`)
      const data = await res.json()
      const locationData = data.data
      locationData.map((item:any) => {
        const location ={
          id: item.id,
          name: item.name,
          address: item.address,
          description: item.description,
          city: item.city,
          country: item.country,
          postalCode: item.postalCode,
          active: item.active,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
        sampleProducts.push(location)
      })
      
    }    

    await generateRandomProductData()

    this.records = sampleProducts;
  },

   getAll({
    actives = [],
    search
  }: {
    actives?: string[];
    search?: string;
  }) {
    let locations = [...this.records];

    // Filter products based on selected categories
    if (actives.length > 0) {
      locations = locations.filter((location) =>
        actives.includes(`${location.active}`)
      );
    }

     if (search) {
          locations = matchSorter(locations, search, {
            keys: ['name', 'city', 'country']
          });
        }
    return locations
  },

  getLocations({
      page = 1,
      limit = 10,
      active,
      search
    }: {
      page?: number;
      limit?: number;
      active?: string;
      search?: string;
    }) {
      const activeArray = active ? active.split(',') : [];
      const allLocation = this.getAll({
        actives: activeArray,
        search
      });
      const totalLocations = allLocation.length;
  
      // Pagination logic
      const offset = (page - 1) * limit;
      const paginatedLocations = allLocation.slice(offset, offset + limit);
  
      // Mock current time
      const currentTime = new Date().toISOString();
  
      // Return paginated response
      return {
        success: true,
        time: currentTime,
        message: 'Sample data for testing and learning purposes',
        total_locations: this.records.length,
        offset,
        limit,
        locations: paginatedLocations
      };
    },
    async getLocationById(id: number) {
    
        const res = await getApi(`${baseUrl}/api/locations/${id}`)
        const location = await res.json()
        if (!location) {
          return {
            success: false,
            message: `Product with ID ${id} not found`
          };
        }
    
        // Mock current time
        const currentTime = new Date().toISOString();
        const data = location.data

        return {
          success: true,
          time: currentTime,
          message: `Product with ID ${id} found`,
          data
        };
      }
}
