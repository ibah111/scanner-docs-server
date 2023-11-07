import { ConstValue, DocAttach } from '@contact/models';
import { InjectModel } from '@sql-tools/nestjs-sequelize';
import { NotFoundException, StreamableFile } from '@nestjs/common';
import { DocumentsInput } from './Documents.input';
import { concatMap, from, map } from 'rxjs';
import { SMBService } from '@tools/nestjs-smb2';

export class DocumentsService {
  constructor(
    private readonly smb: SMBService,
    @InjectModel(DocAttach, 'contact') private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue, 'contact')
    private modelConstValue: typeof ConstValue,
  ) {}
  get(body: DocumentsInput) {
    from(
      this.modelConstValue.findOne({
        where: { name: 'DocAttach.SavePath' },
        rejectOnEmpty: true,
      }),
    ).pipe(
      map((data) => data.value as string),
      concatMap((save_path) =>
        from(
          this.modelDocAttach.findByPk(body.id, { rejectOnEmpty: true }),
        ).pipe(map((doc) => ({ save_path, doc }))),
      ),
      concatMap((data) => {
        const tmp = data.save_path.split('\\');
        const dir = tmp[tmp.length - 1];
        const path = `${dir}${data.doc.REL_SERVER_PATH}${data.doc.FILE_SERVER_NAME}`;
        return this.smb.exists(path).pipe(
          map((exists) => {
            if (!exists) throw new NotFoundException('Файл не найден');
            return new StreamableFile(this.smb.readFileStream(path));
          }),
        );
      }),
    );
  }
}
