import { AppService } from './app.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      return this.appService.reqister({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {}
  }
}
