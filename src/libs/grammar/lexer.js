import { createToken, Lexer } from 'chevrotain';

export function createLexerAndTokens(fields, operations) {
    const fieldRegex  = new RegExp(
        fields
            .filter(f => f.indexOf(' ') === -1)
            .concat(fields.map(f => `"${f}"`))
            .map(f => f.replace('(', '\\(').replace(')', '\\)'))
            .join('|')
    );

    const operationRegex = new RegExp(
        operations
            .filter(o => o.index(' ') === -1)
            .concat(operations.map(o => `"${o}"`))
            .join('|')
    );

    const OperatorOperator = createToken({ name: 'OperatorOperator', pattern: Lexer.NA });
    const OR = createToken({ name: 'OR', pattern: /OR/, categories: OperatorOperator });
    const AND = createToken({ name: 'AND', pattern: /AND/, categories: OperatorOperator });

    const LParen = createToken({ name: 'LParen', pattern: /\(/ });
    const RParen = createToken({ name: 'RParen', pattern: /\)/ });

    const Operation = createToken({ name: 'Operation', pattern: operationRegex });
    const Field = createToken({ name: 'Field', pattern: fieldRegex });
    const QuotedValue = createToken({ name: 'QuotedValue', pattern: /\"[a-zA-Z0-9\-_]+\"/ });
    const Value = createToken({ name: 'Value', pattern: /[a-zA-Z0-9\-_]+/ });

    const Comma = createToken({ name: 'Comma', pattern: /,/ });

    const Whitespace = createToken({ name: 'Whitespace', pattern: /\s+/, lineBreaks: true });

    const tokens = {
        OR,
        AND,
        OperatorOperator,
        LParen,
        RParen,
        Operation,
        Field,
        QuotedValue,
        Value,
        Whitespace,
        Comma,
    };

    return {
        tokens,
        lexer: new Lexer(Object.values(tokens)),
    };
}