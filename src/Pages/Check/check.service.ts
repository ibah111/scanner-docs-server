import { Injectable } from '@nestjs/common';
@Injectable()
export class CheckService {
  private readonly cats: Cat[] = [];

  create(check: Check) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}