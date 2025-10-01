type role = 'USER' | 'ADMIN' 

export type Profile = {
    id:  number,
    username: string,
    email: string,
    fullName: string | null,
    phoneNumber: string | null,
    role: role,
    department: string | null
}