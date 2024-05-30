import { CreateTable } from './create-table.use-cases';



describe('Pruebas en el plugin create tble', () => { 
    
    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({base: 5});


        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('5 X 1 = 5');
        expect(table).toContain('5 X 10 = 50');
    });

    test('should create table with custom values', () => {
        const createTable = new CreateTable();
        const options = {
            base: 4,
            limit: 15
        }
        const table = createTable.execute(options);
        const rows = table.split('\n').length;

        expect(table).toContain('4 X 1 = 4');
        expect(table).toContain('4 X 9 = 36');
        expect(rows).toBe(options.limit );
     

    });
 })