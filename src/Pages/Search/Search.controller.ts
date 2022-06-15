import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SearchInput } from './Search.input';
import { SearchService } from './Search.service';

@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}
  
    @HttpCode(200)
    @Post()
    async find(@Body() body: SearchInput) {
      return await this.searchService.find(body);
    }
  }
