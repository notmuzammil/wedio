import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private configService;
    constructor(prisma: PrismaService, jwt: JwtService, configService: ConfigService);
    signup(dto: SignupDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signin(dto: SigninDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateTokens(user: {
        id: string;
        email: string;
        role: string;
    }): {
        accessToken: string;
        refreshToken: string;
    };
}
