import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('home')
  helloWorld() {
    return {};
  }
}
