import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/Modules/Guards/auth.guard";
import { DataInput } from "./Data.input";
import { DataService } from "./Data.service";

@Controller('data')
@UseGuards(AuthGuard)
export class DataController {
    constructor(private dataService: DataService) {}

    @HttpCode(200)
    @Post()
    async get(@Body() body: DataInput) {
      return await this.dataService.get(body);
    }
  }
