import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
// import { AppService } from './user.service';
import { postgraphileProvider } from './User.factory'
@Module({
    imports: [],
    controllers: [UserController],
    providers: [postgraphileProvider],
})
export class UserModule { }
