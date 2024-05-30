import fs from "fs";
import { SendFile } from "./send-file.use-case";

describe("Pruebas en el pluging send-file-use-case", () => {
  afterEach(() => {
    const fileExist = fs.existsSync("outputs");
    if (fileExist) fs.rmSync("outputs", { recursive: true });
  });

  test("debe guardar el archivo con los valores por defecto", () => {
    const sendFile = new SendFile();
    const options = { fileContent: "test content" };
    const filePath = "outputs/table.txt";

    const result = sendFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toEqual(options.fileContent);
  });

  test("debe guardar el archivo con los valores customs ", () => {
    const sendFile = new SendFile();
    const options = {
      fileContent: "test content",
      fileDestination: "outputs-test",
      fileName: "tabletest",
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const result = sendFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toEqual(options.fileContent);
  });

  test("should return false if directory could no be created  ", () => {
    const options = { fileContent: "test content" };
    const sendFile = new SendFile();

    const mkdirSyncSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("custom error desde el testing");
    });
    const result = sendFile.execute(options);

    expect(result).toBe(false);
    mkdirSyncSpy.mockRestore();
  });

  test("should return false if file could no be created", () => {
    const options = { fileContent: "test content" };
    const sendFile = new SendFile();

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(()=> {
      throw new Error('test error:  file could no be created');
    });

    const result = sendFile.execute(options);

    expect(result).toBeFalsy(); 
    writeFileSyncSpy.mockRestore();
  });
});
 