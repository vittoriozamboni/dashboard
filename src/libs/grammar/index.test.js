import { Grammar } from './index';
import { italic } from 'ansi-colors';
import expectExport from 'expect';

describe('Grammar', () => {
    const fields = ['Id', 'Model Id', 'Model Name', 'Model Category'];
    const fieldNames = {
        'Model Id': 'id',
        'Model Name': 'model_name',
        'Model Category': 'model_category',
    };
    const operations = [
        'is',
        'is not',
        'contains',
        '>'
    ];

    it('Creates a grammar correctly', () => {
        const newGrammar = new Grammar(fields, operations, fieldNames);
        // expect(newGrammar).toNotEqual(null);
    });

    it('Parses the string "Id is 5" successfully', () => {
        const g = new Grammar(fields, operations, fieldNames);
        g.parseString('Id is 5');
        expect(g.isStringValid()).toEqual(true);
    });

    it('Parses the string "Model Id is 5" successfully', () => {
        const g = new Grammar(fields, operations, fieldNames);
        g.parseString('"Model Id" is 5');
        expect(g.isStringValid()).toEqual(true);
    });

    it('Should mark "Model I" as an error on the field', () => {
        const g = new Grammar(fields, operations, fieldNames);
        g.parseString('"Model I"');
        expect(g.isStringValid()).toEqual(false);
        expect(g.getTokenNameOnError()).toEqual('Field');
    });


});