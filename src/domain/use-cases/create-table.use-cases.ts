export interface CrateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CrateTableUseCase {
  constructor() {
   /**
    * D-I DEpendecy Injection
    *  */ 
  }

  execute({ base, limit = 10 }: CreateTableOptions) {
    let ouputMessage = "";

    for (let i = 1; i < limit; i++) {
      ouputMessage += `${base} X ${i} = ${base * i}\n`;
    }

    return ouputMessage;
  }
}
