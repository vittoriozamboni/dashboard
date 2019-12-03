import { createParser } from './parser';
import { createLexerAndTokens } from './lexer';
import { createInterpreter } from './interpreter';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export class Grammar {

    constructor(fields, operations, fieldNames = {}) {
        if (!fields) throw new Error('Fields are mandatory.');
        if (!operations) throw new Error('Operations are mandatory.');

        this.fields = fields;
        this.operations = operations;

        const { lexer, tokens } = createLexerAndTokens(fields, operations);
        this.lexer = lexer;
        this.tokens = tokens;

        this.parser = createParser(this.tokens);
        this.interpreter = createInterpreter(this.parser.getBaseCstVisitorConstructor(), fieldNames);

        this.parsed = false;
        this.stringTokens = Object.keys(this.tokens).reduce((o, k) => {
            o[k] = k;
            return o;
        }, {});
    }

    get FIELDS() {
        return [this.stringTokens.Field];
    }
    get OPERATION() {
        return [this.stringTokens.Operation];
    }
    get VALUES() {
        return [this.stringTokens.Value, this.stringTokens.QuotedValue];
    }
    get OPERATORS() {
        return [this.stringTokens.AND, this.stringTokens.OR, this.stringTokens.OperatorOperator];
    }
    get AVAILABLE_OPERATORS() {
        return [this.stringTokens.AND, this.stringTokens.OR];
    }
    get WHITESPACE() {
        return [this.stringTokens.Whitespace];
    }

    _hasParsed() {
        return this.parsed;
    }

    parseString(stringToParse) {
        const lexingResult = this.lexer.tokenize(stringToParse);
        this.parser.input = lexingResult.tokens;
        this.ast = this.interpreter.visit(this.parser.expression());
        this.parsed = true;
    }

    hasErrors() {
        return this.parser.errors.length > 0;
    }

    getTokenNameOnError() {
        if (!this._hasParsed()) throw new Error('You must parse a string before');

        const { parser } = this;
        const error = parser.errors[0];
        return error.message[error.message.length - 1].tokenName;
    }

    getQueryResult() {
        return this.ast;
    }

    getLastFieldToken(fieldValueOrOperationValue) {
        if (!this._hasParsed()) throw new Error('You must parse a string before');

        const { parser } = this;
        const { input } = parser;
        let offset = 1;
        if (fieldValueOrOperationValue) {
            input.some((token, index) => {
                if (token.image === fieldValueOrOperationValue) {
                    offset = input.length - index;
                    return true;
                }
                return false;
            });
        }
        let position = input.length - offset;

        while (input[position] && input[position].tokenType.tokenName !== 'Field') {
            position -= 1;
        }
        const lastToken = input[position];
        return lastToken;
    }

    getLastToken() {
        if (!this._hasParsed()) throw new Error('You must parse a string before');

        return this.parser.input[this.parser.input.length - 1];
    }

    getLastTokenName() {
        if (!this._hasParsed()) throw new Error('You must parse a string before');

        return this.getLastToken().tokenType.tokenName;
    }

    isStringValid() {
        return this.parser.errors.length === 0;
    }

    getLastTokenAtPosition(cursorPosition) {
        let token;
        this.parser.input.some(block => {
            const { startColumn, endColumn } = block;
            if (cursorPosition >= startColumn && cursorPosition <= endColumn) {
                if (block.tokenType.tokenName !== 'Whitespace') {
                    token = block;
                    return true;
                }
            }
            return false;
        });
        return token;
    }

    getTokenBeforePosition(cursorPosition) {
        let token;
        this.parser.input.some((block, index) => {
            const { startColumn, endColumn } = block;
            if (cursorPosition >= startColumn && cursorPosition <= endColumn) {
                if (block.tokenType.tokenName !== 'Whitespace') {
                    token = this.parser.input[index - 1];
                    return true;
                }
            }
            return false;
        });
        return token;
    }

    includes(stringToSearch) {
        return this.parser.input.some(token => token.image === stringToSearch);
    }

    getTokens() {
        return this.parser.input;
    }

    toString() {
        return this.parser.input.reduce((finalString, token) => {
            return finalString + token.image;
        }, '');
    }

    replace(startColumn, newString) {
        return this.parser.input.reduce((finalString, token) => {
            if (token.startColumn === startColumn) return finalString + newString;

            return finalString + token.image;
        });
    }

    getTokenAt(index) {
        return this.parser.input[index];
    }

    isValidField = fieldName => this.FIELDS.includes(fieldName);
    isValidOperation = fieldName => this.OPERATION.includes(fieldName);
    isValidValue = fieldName => this.VALUES.includes(fieldName);
    isValidOperator = fieldName => this.OPERATORS.includes(fieldName);
    isValidWhitespace = fieldName => this.WHITESPACE.includes(fieldName);

    sameTokenType(firstToken, secondToken) {
        if (!firstToken || !secondToken) return false;

        const firstName = firstToken.tokenType.tokenName;
        const secondName = secondToken.tokenType.tokenName;

        const bothFields = this.isValidField(firstName) && this.isValidField(secondName);
        const bothOperations = this.isValidOperation(firstName) && this.isValidOperation(secondName);
        const bothValues = this.isValidValue(firstName) && this.isValidValue(secondName);
        const bothOperators = this.isValidOperator(firstName) && this.isValidOperator(secondName);
        const bothWhitespaces = this.isValidWhitespace(firstName) && this.isValidWhitespace(secondName);

        return bothFields || bothOperations || bothValues || bothOperators || bothWhitespaces;
    }
}