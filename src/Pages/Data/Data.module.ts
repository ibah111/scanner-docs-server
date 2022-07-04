import { SequelizeModule } from "@contact/nestjs-sequelize";
import { Module } from "@nestjs/common";
import { Barcode } from "src/Database/Local.database/models/Barcode.model";
import { Doc } from "src/Database/Local.database/models/Doc.model";
import { DataController } from "./Data.controller";
import { DataService } from "./Data.service";

@Module({
    imports: [SequelizeModule.forFeature([Barcode, Doc])],
    controllers: [DataController],
    providers: [DataService],
  })
  export class DataModule {}
  
