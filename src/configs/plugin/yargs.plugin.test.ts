const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { yarg } = await import("./yargs.plugin");

  return yarg;
};

describe("Pruebas en el pluging de yarg", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });
  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "table",
        d: "./outputs",
      })
    );
  });

  test("should return conmfiguration with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "7",
      "-l",
      "7",
      "-s",
      "-n",
      "table-test",
      "-d",
      "./test",
    ]);

    
    expect(argv).toEqual(
      expect.objectContaining({
        b: 7,
        l: 7,
        s: true,
        n: "table-test",
        d: "./test",
      })
    );
  });
});
