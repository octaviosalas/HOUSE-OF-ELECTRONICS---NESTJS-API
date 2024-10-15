import { Module } from '@nestjs/common';
import { DataBaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DataBaseModule, AuthModule]
})
export class AppModule {}
