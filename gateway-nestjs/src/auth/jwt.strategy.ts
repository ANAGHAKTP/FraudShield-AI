import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-me', // Fallback for dev only. Should fail in prod.
        });
        if (!process.env.JWT_SECRET) {
            console.warn('CRITICAL WARNING: JWT_SECRET is not set in JwtStrategy.');
        }
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
