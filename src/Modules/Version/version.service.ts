import { Injectable } from '@nestjs/common';
import gitSemverTags from 'git-semver-tags';
import path from 'path';
import semver from 'semver';
import fs from 'fs';

const gitGet = (): Promise<string> =>
  new Promise((resolve) => {
    gitSemverTags({ tagPrefix: 'v' }, (err, result) => {
      if (result) {
        const tags = result.map((value) => semver.clean(value));
        resolve(tags[0]!);
      } else resolve(fs.readFileSync(path.join(__dirname, 'version'), 'utf8'));
    });
  });

@Injectable()
export class VersionService {
  version: string;
  async init() {
    this.version = await gitGet();
  }
}
