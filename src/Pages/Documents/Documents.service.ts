import { ConstValue, DocAttach } from '@contact/models';
import { InjectModel } from '@contact/nestjs-sequelize';
import { NotFoundException } from '@nestjs/common';
import { SMBService } from 'src/Modules/Smb/Smb.service';
import { DocumentsInput } from './Documents.input';

export class DocumentsService {
  constructor(
    private readonly SMB: SMBService,
    @InjectModel(DocAttach) private modelDocAttach: typeof DocAttach,
    @InjectModel(ConstValue) private modelConstValue: typeof ConstValue,
  ) {}
  async get(body: DocumentsInput) {
    const save_path: string = (
      await this.modelConstValue.findOne({
        where: { name: 'DocAttach.SavePath' },
      })
    ).value;
    const client = this.SMB.get();
    const doc = await this.modelDocAttach.findByPk(body.id);
    const tmp = save_path.split('\\');
    const dir = tmp[tmp.length - 1];
    const path = `${dir}${doc.REL_SERVER_PATH}${doc.FILE_SERVER_NAME}`;
    if (!(await client.exists(path)))
      throw new NotFoundException('Файл не найден');
    const file_data = await client.readFile(path);
    return file_data;
  }
}
