import { Role, VendorCategory } from 'generated/prisma';
export declare class SignupDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role?: Role;
    businessName?: string;
    vendorCategory?: VendorCategory;
    city?: string;
    area?: string;
    address?: string;
    description?: string;
    logoUrl?: string;
}
