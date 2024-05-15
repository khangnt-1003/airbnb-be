import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {};
    async signup(authDto: AuthDto): Promise<Tokens> {
        const {username, password} = authDto;
        const foundUser = await this.userService.findByUsername(username);
        if (foundUser) throw new BadRequestException("User already exists");
        
        const hashedPassword = await this.hashData(password);
        const newUser = await this.userService.create({username, password: hashedPassword});
        const tokens = await this.getTokens(newUser._id.toString(), newUser.username);
        await this.updateRefreshToken(newUser._id.toString(), tokens.refreshToken);

        return tokens;
    }

    async signin(authDto: AuthDto): Promise<Tokens> {
        const {username, password} = authDto;
        const foundUser = await this.userService.findByUsername(username);
        if (!foundUser) throw new ForbiddenException("Access denied");

        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!isPasswordValid) throw new ForbiddenException("Access denied");

        const tokens = await this.getTokens(foundUser._id.toString(), foundUser.username);
        await this.updateRefreshToken(foundUser._id.toString(), tokens.refreshToken);

        return tokens;
    }

    async logout(userId: string) {
        return await this.userService.removeRefreshToken(userId);
    }

    async refresh(userId: string, refreshToken: string) {
        const foundUser = await this.userService.findOne(userId);
        if (!foundUser.refreshToken) throw new ForbiddenException('Access denied');
        const rfMatches = await bcrypt.compare(refreshToken, foundUser.refreshToken);
        if (!rfMatches) throw new ForbiddenException("Access denied");

        const tokens = await this.getTokens(userId, foundUser.username);
        await this.updateRefreshToken(userId, tokens.refreshToken);

        return tokens;
    }

    hashData(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {secret: this.configService.get<string>('JWT_SECRET'), expiresIn: '900s'}),
            this.jwtService.signAsync({
                sub: userId,
                username
            }, {secret: this.configService.get<string>('JWT_SECRET_RF'), expiresIn: '3d'}),
        ])

        return {
            accessToken,
            refreshToken,
        }
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const updateUserDto = new UpdateUserDto();
        const hashedRF = await this.hashData(refreshToken);
        updateUserDto.refreshToken = hashedRF;
        const updatedUser = await this.userService.update(userId, updateUserDto);
    }
}
