import { baseUrl } from "@/config/baseUrl";
import { getApi } from "@/lib/apiFetch";
import { matchSorter } from "match-sorter";
import { Location } from "./apiLocation";

export type Room = {
    id: number,
    name: string,
    capacity: number,
    description: string,
    equipments: string,
    imageUrl: string,
    active: boolean,
    location: Location,
    createdAt: Date,
    updatedAt: Date
}
export const initData = {
    records: [] as Room[],

    async initialize() {
    const sampleProducts: Room[] = [];
    async function generateRandomProductData(){
      const res = await getApi(`${baseUrl}/api/rooms/active`)
      const data = await res.json()
      const roomData = data.data
      roomData.map((item:any) => {
        const room ={
            id: item.id,
            name: item.name,
            capacity: item.capacity,
            description: item.description,
            equipments: item.equipments,
            imageUrl: item.imageUrl,
            active: item.active,
            location: {
                id: item.location.id,
                name: item.location.name,
                address: item.location.address,
                description: item.location.description,
                city: item.location.city,
                country: item.location.country,
                postalCode: item.location.postalCode,
                active: item.location.active,
                createdAt: item.location.createdAt,
                updatedAt: item.location.updatedAt
            },
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        }
        sampleProducts.push(room)
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
    let rooms = [...this.records];

    // Filter products based on selected categories
    if (actives.length > 0) {
      rooms = rooms.filter((room) =>
        actives.includes(`${room.active}`)
      );
    }

     if (search) {
          rooms = matchSorter(rooms, search, {
            keys: ['name']
          });
        }
    return rooms
  },

  getRooms({
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
      const allRoom = this.getAll({
        actives: activeArray,
        search
      });
  
      // Pagination logic
      const offset = (page - 1) * limit;
      const paginatedRooms = allRoom.slice(offset, offset + limit);
  
      // Mock current time
      const currentTime = new Date().toISOString();
  
      // Return paginated response
      return {
        success: true,
        time: currentTime,
        message: 'Sample data for testing and learning purposes',
        total_rooms: this.records.length,
        offset,
        limit,
        rooms: paginatedRooms
      };
    },
    async getRoomById(id: number) {
    
        const res = await getApi(`${baseUrl}/api/rooms/${id}`)
        const room = await res.json()
        if (!room) {
          return {
            success: false,
            message: `Product with ID ${id} not found`
          };
        }
    
        // Mock current time
        const currentTime = new Date().toISOString();
        const data = room.data

        return {
          success: true,
          time: currentTime,
          message: `Product with ID ${id} found`,
          data
        };
      }
}
