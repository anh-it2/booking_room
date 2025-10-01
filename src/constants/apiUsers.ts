import { baseUrl } from '@/config/baseUrl';
import { getApi } from '@/lib/apiFetch';
import { matchSorter } from 'match-sorter';

type role = 'USER' | 'ADMIN';

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: role;
  avatarUrl: string;
  department: string | null;
  active: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export const initData = {
  records: [] as User[],

  async initialize() {
    const sampleProducts: User[] = [];
    async function generateRandomProductData() {
      const res = await getApi(`${baseUrl}/api/admin/users/list`);
      const data = await res.json();
      const userData = data.data;

      if (userData === undefined) return;

      userData.map((item: any) => {
        const user = {
          id: item.id,
          username: item.username,
          email: item.email,
          fullName: item.fullName,
          phone: item.phone,
          role: item.role,
          avatarUrl: item.avatarUrl,
          active: item.active,
          department: item.department,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        };
        sampleProducts.push(user);
      });
    }

    await generateRandomProductData();

    this.records = sampleProducts;
  },

  getAll({ actives = [], search }: { actives?: string[]; search?: string }) {
    let users = [...this.records];

    // Filter products based on selected categories
    if (actives.length > 0) {
      users = users.filter((user) => actives.includes(`${user.active}`));
    }

    if (search) {
      users = matchSorter(users, search, {
        keys: ['username']
      });
    }
    return users;
  },

  getUsers({
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
    const allUser = this.getAll({
      actives: activeArray,
      search
    });
    const totalUsers = allUser.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUser.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: this.records.length,
      offset,
      limit,
      users: paginatedUsers
    };
  },
  async getUserById(id: number) {
    const res = await getApi(`${baseUrl}/api/admin/users/${id}`);
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
