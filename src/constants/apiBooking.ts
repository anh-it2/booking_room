import { baseUrl } from '@/config/baseUrl';
import { getApi } from '@/lib/apiFetch';
import { matchSorter } from 'match-sorter';
import { Location } from './apiLocation';
import { User } from './apiUsers';

type MeetingRoom = {
  id: number;
  name: string;
  capacity: number;
  description: string;
  equipments: string;
  imageUrl: string;
  active: boolean;
  location: Location;
  createdAt: string;
  updatedAt: string;
};

type status = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
type role = 'ADMIN' | 'USER';

type userResponse = {
  username: string | null;
  role: role | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
};

export type Booking = {
  id: number;
  createdBy: User;
  meetingRoom: MeetingRoom;
  title: string;
  description: string;
  purpose: string;
  startTime: string;
  endTime: string;
  status: status;
  approver: userResponse | null;
  approvedAt: string;
  cancelledAt: string;
  cancelledBy: string;
  createdAt: string;
  updatedAt: string;
  participants: Array<userResponse> | null;
};

export const initData = {
  records: [] as Booking[],

  async initialize() {
    const sampleProducts: Booking[] = [];
    async function generateRandomProductData() {
      const res = await getApi(`${baseUrl}/api/admin/booking`);
      const data = await res.json();
      const bookingData = data.data;
      bookingData.map((item: any) => {
        const booking = {
          id: item.id,
          createdBy: {
            id: item.createdBy.id,
            username: item.createdBy.username,
            email: item.createdBy.email,
            fullName: item.createdBy.fullName,
            phone: item.createdBy.phong,
            role: item.createdBy.role,
            avatarUrl: item.createdBy.avatarUrl,
            department: item.createdBy.department,
            active: item.createdBy.active,
            createdAt: item.createdBy.createdAt,
            updatedAt: item.createdBy.updatedAt
          },
          meetingRoom: {
            id: item.meetingRoom.id,
            name: item.meetingRoom.name,
            capacity: item.meetingRoom.capacity,
            description: item.meetingRoom.description,
            equipments: item.meetingRoom.equipments,
            imageUrl: item.meetingRoom.imageUrl,
            active: item.meetingRoom.active,
            location: {
              id: item.meetingRoom.location.id,
              name: item.meetingRoom.location.name,
              address: item.meetingRoom.location.address,
              description: item.meetingRoom.location.description,
              city: item.meetingRoom.location.city,
              country: item.meetingRoom.location.country,
              postalCode: item.meetingRoom.location.postalCode,
              active: item.meetingRoom.location.active,
              createdAt: item.meetingRoom.location.createdAt,
              updatedAt: item.meetingRoom.location.updatedAt
            },
            createdAt: item.meetingRoom.createdAt,
            updatedAt: item.meetingRoom.updatedAt
          },
          title: item.title,
          description: item.description,
          purpose: item.purpose,
          startTime: item.startTime,
          endTime: item.endTime,
          status: item.status,
          approver: {
            username: item.approver?.username,
            role: item.approver?.role,
            fullName: item.approver?.fullName,
            email: item.approver?.email,
            phone: item.approver?.phone
          },
          approvedAt: item.approvedAt,
          cancelledAt: item.cancelledAt,
          cancelledBy: item.cancelledBy,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          participants: item.participants
        };
        sampleProducts.push(booking);
      });
    }

    await generateRandomProductData();

    this.records = sampleProducts;
  },

  getAll({ status = [], search }: { status?: string[]; search?: string }) {
    let bookings = [...this.records];

    // Filter products based on selected categories
    if (status.length > 0) {
      bookings = bookings.filter((booking) =>
        status.includes(`${booking.status}`)
      );
    }

    if (search) {
      bookings = matchSorter(bookings, search, {
        keys: ['name', 'title']
      });
    }
    return bookings;
  },

  getBookings({
    page = 1,
    limit = 10,
    status,
    search
  }: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const statusArray = status ? status.split(',') : [];
    const allbooking = this.getAll({
      status: statusArray,
      search
    });

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedBookings = allbooking.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_bookings: this.records.length,
      offset,
      limit,
      bookings: paginatedBookings
    };
  },
  async getBookingsById(id: number) {
    const res = await getApi(`${baseUrl}/api/locations/${id}`);
    const location = await res.json();
    if (!location) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();
    const data = location.data;

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      data
    };
  }
};
