import { SECRET_KEY } from '@/config';
import { SignInRequestDto } from '@/dtos/auth/SignInRequest.dto';
import { SignOutRequestDto } from '@/dtos/auth/SignOutRequest.dto';
import { SignUpRequestDto } from '@/dtos/auth/SignUpRequest.dto';
import { CreateUserDto } from '@/dtos/user/create-user.dto';
import { HttpException } from '@/exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@/interfaces/auth.interface';
import { User, UserShape } from '@/models/user.model';
import { assertIsNotEmpty, assertModelDoesNotExist, assertModelExists } from '@/utils/asserts';
import { compare } from 'bcrypt';
import { assert } from 'console';
import { sign } from 'jsonwebtoken';
import { BaseService } from './base.service';
import { UserService } from './user.service';

export class AuthService extends BaseService {
  protected userService = new UserService();

  public createToken(user: User): string {
    const expiresIn: number = 60 * 60;
    const secretKey: string = SECRET_KEY;
    const dataStoredInToken: DataStoredInToken = { id: user.id };

    return sign(dataStoredInToken, secretKey, { expiresIn });
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async signIn(dto: SignInRequestDto) {
    await assertIsNotEmpty(dto);

    const user = await this.userService.getByEmail(dto.email);
    await assertModelExists(user);
    await assert(user.role);

    const matches = await compare(dto.password, user.password);
    if (!matches) {
      throw new HttpException(401, 'Invalid sign in credentials');
    }

    const token = this.createToken(user);

    return { user: user as UserShape, token };
  }

  public async signUp(dto: SignUpRequestDto) {
    await assertIsNotEmpty(dto);

    const userByEmail = await this.userService.getByEmail(dto.email);
    await assertModelDoesNotExist(userByEmail);

    const user = await this.userService.createOne(CreateUserDto.fromSignUpRequest(dto));
    await assert(user.role);

    const token = this.createToken(user);

    return { user: user as UserShape, token };
  }

  public async signOut(dto: SignOutRequestDto): Promise<boolean> {
    await assertIsNotEmpty(dto);

    return true;
  }
}
