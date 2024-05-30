import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SendFile } from "../domain/use-cases/send-file.use-case";
import { ServerApp } from "./server-app";

describe("Pruenas el server-app", () => {
  test("should created serverApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run server with options ", () => {
    const options = {
      base: 4,
      limit: 5,
      showTable: true,
      fileName: "test-fileName",
      fileDestination: "test-fileDestination",
    };

    const spyLog = jest.spyOn(console, "log");
    const spyCreateTable = jest.spyOn(CreateTable.prototype, "execute");
    const spySendFile = jest.spyOn(SendFile.prototype, "execute");

    ServerApp.run(options);

    expect(spyLog).toHaveBeenCalled();
    expect(spyLog).toHaveBeenCalledTimes(2);
    expect(spyLog).toHaveBeenCalledWith("Server Running...");

    expect(spyCreateTable).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(spySendFile).toHaveBeenCalledWith({
        fileContent: expect.any(String),
        fileDestination: options.fileDestination,
        fileName: options.fileName,
      });
  });
});
