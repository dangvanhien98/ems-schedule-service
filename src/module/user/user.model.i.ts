export interface LoginRequest {
  userName: string;
  password: string;
}
export interface User {
  id: number;
  fullName: string;
  userName: string;
  password: string;
}
export interface JwtResponse {
  accessToken: string;
  typeToken: string;
  user: User;
}

export interface userInfo{
  userId: number;
  fullName?: string;
  userName: string;
}
