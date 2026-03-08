import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Mock in-memory database
const users: any[] = [];

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async register(email: string, pass: string): Promise<any> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(pass, salt);

        const newUser = { id: users.length + 1, email, hash };
        users.push(newUser);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash: _, ...result } = newUser;
        return result;
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = users.find(u => u.email === email);
        if (!user) return null;

        const isMatch = await bcrypt.compare(pass, user.hash);
        if (isMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { hash: _, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
