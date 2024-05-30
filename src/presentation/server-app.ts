import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SendFile } from "../domain/use-cases/send-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {
  static run({
    base,
    limit,
    showTable,
    fileName,
    fileDestination,
  }: RunOptions) {
    console.log("Server Running...");

    const table = new CreateTable().execute({ base, limit });

    if (showTable) console.log(table);
    const wasCreate = new SendFile().execute({ fileContent: table, fileName, fileDestination });
  }
}
