import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'rosp',
  description: 'Insert login after command',
})
export class RospCommand extends CommandRunner {
  constructor() {
    super();
  }
  async run(): Promise<void> {
    console.log('run');
    await this.main();
  }

  async main(): Promise<void> {
    const filePath = __dirname;
    console.log(filePath);
  }
}
