import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        email: string;
        name: string;
        passwordHash: string;
        role: import("generated/prisma").$Enums.Role;
        phone: string | null;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        email: string;
        name: string;
        passwordHash: string;
        role: import("generated/prisma").$Enums.Role;
        phone: string | null;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    create(data: CreateUserDto): Promise<{
        email: string;
        name: string;
        passwordHash: string;
        role: import("generated/prisma").$Enums.Role;
        phone: string | null;
        id: string;
        refreshToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
