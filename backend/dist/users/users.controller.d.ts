import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: any): any;
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
    create(createuserDto: CreateUserDto): Promise<{
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
