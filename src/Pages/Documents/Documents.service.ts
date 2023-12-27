import { ConstValue, DocAttach } from '@contact/models';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { NotFoundException, StreamableFile } from '@nestjs/common';
import { concatMap, from, map } from 'rxjs';
import { SMBService } from '@tools/nestjs-smb2';

export class DocumentsService {
  constructor(
    private readonly smb: SMBService,
    @InjectModel(DocAttach, 'contact') private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue, 'contact')
    private modelConstValue: typeof ConstValue,
  ) {}

  async rxjsGet(id: number) {
    return from(
      this.modelConstValue.findOne({
        rejectOnEmpty: new NotFoundException('ConstValue не найден'),
        where: {
          name: 'DocAttach.SavePath',
        },
      }),
    ).pipe(
      map((data) => {
        const d = data.value as string;
        return d;
      }),
      concatMap((save_path) =>
        from(
          this.modelDocAttach.findByPk(id, {
            rejectOnEmpty: new NotFoundException('Файл не найден'),
          }),
        ).pipe(map((doc) => ({ save_path, doc }))),
      ),
      concatMap((data) => {
        const tmp = data.save_path.split('\\');
        const dir = tmp[tmp.length - 1];
        const path = `${dir}${data.doc.REL_SERVER_PATH}${data.doc.FILE_SERVER_NAME}`;
        return this.smb.exists(path).pipe(
          map((exists) => {
            if (!exists) throw new NotFoundException('Файл не найден');
            const file = new StreamableFile(this.smb.readFileStream(path));
            return file;
          }),
        );
      }),
    );
  }
}
