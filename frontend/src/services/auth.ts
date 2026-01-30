import { api } from "@/lib/api";

export interface SignupPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
}

export interface VendorSignupPayload {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: "VENDOR";
  businessName: string;
  vendorCategory: "HALL" | "CATERING" | "CAR_RENTAL" | "BEAUTY" | "OTHER";
  city: string;
  area: string;
  address: string;
  description: string;
  logoUrl?: string;
}

export async function signup(data: SignupPayload) {
  const res = await api.post("/auth/signup", data);
  return res.data;
}

export interface VendorSignupResponse {
  accessToken: string;
  refreshToken: string;
}

export async function vendorSignup(data: VendorSignupPayload): Promise<VendorSignupResponse> {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

export async function signin(data: SigninPayload): Promise<SigninResponse> {
  const res = await api.post("/auth/signin", data);
  return res.data;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export async function refreshAccessToken(token: string): Promise<RefreshTokenResponse> {
  const res = await api.post("/auth/refresh", { refreshToken: token });
  return res.data;
}
