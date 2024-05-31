import { CreateTable } from "../domain/use-cases/create-table.use-cases";
import { SendFile } from "../domain/use-cases/send-file.use-case";
import { ServerApp } from "./server-app";

describe("Pruenas el server-app", () => {
  const options = {
    base: 4,
    limit: 5,
    showTable: true,
    fileName: "test-fileName",
    fileDestination: "test-fileDestination",
  };

  test("should created serverApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("should run server with options ", () => {
    // const spyLog = jest.spyOn(console, "log");
    // const spyCreateTable = jest.spyOn(CreateTable.prototype, "execute");
    // const spySendFile = jest.spyOn(SendFile.prototype, "execute");
    // ServerApp.run(options);
    // expect(spyLog).toHaveBeenCalled();
    // expect(spyLog).toHaveBeenCalledTimes(2);
    // expect(spyLog).toHaveBeenCalledWith("Server Running...");
    // expect(spyCreateTable).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // });
    // expect(spySendFile).toHaveBeenCalledWith({
    //     fileContent: expect.any(String),
    //     fileDestination: options.fileDestination,
    //     fileName: options.fileName,
    //   });
  });

  test("should return with custom values mocked", () => {
    const fileContent = "1x2=2";

    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue(fileContent);
    const sendFileMock = jest.fn();

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createTableMock;
    SendFile.prototype.execute = sendFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server Running...");
    expect(logErrorMock).toHaveBeenCalledWith("algo error");
    expect(createTableMock).toHaveBeenCalledWith({ base: 4, limit: 5 });
    expect(sendFileMock).toHaveBeenCalledWith({
      fileContent: "1x2=2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
});
