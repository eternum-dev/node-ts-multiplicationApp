import fs from "fs";

export interface SendFileUseCase {
  execute: (options: SendFileOptions) => boolean;
}

interface SendFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SendFile implements SendFileUseCase {
  constructor() {
    //
  }

  execute({ fileContent, fileDestination = 'outputs', fileName= 'table' }: SendFileOptions) {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
    } catch (error) {
      // console.error(error);
      return false;
    }

    return true;
  }
}
