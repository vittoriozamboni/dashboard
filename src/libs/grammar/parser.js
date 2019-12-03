import { Parser } from 'chevrotain';
import { createMessageProvider } from './messageProvider';

let parserCounter = 0;

export function createParser(allTokens) {
    parserCounter++;
    const className = `ParsePure${parserCounter}`;

    const ParserClass = { [className]: class extends Parser {

        constructor(input) {
            const tokensAsArray = Object.values(allTokens);
            const grammarMessageProvider = createMessageProvider(allTokens);
            super(input, tokensAsArray, { outputCst: true, errorMessageProvider: grammarMessageProvider  });

            const { Whitespace, OperatorOperator, LParen, RParen, Operation, Field, QuotedValue, Value } = allTokens;

            this.RULE('expression', () => {
                this.SUBRULE(this.atomicExpression, { LABEL: 'lhs' });
                this.MANY(() => {
                    this.CONSUME(Whitespace);
                    this.CONSUME(OperatorOperator);
                    this.CONSUME2(Whitespace);
                    this.SUBRULE2(this.atomicExpression, { LABEL: 'rhs' });
                });
            });

            this.RULE('atomicExpression', () => this.OR([
                { ALT: () => this.SUBRULE(this.parenthesisExpression) },
                { ALT: () => this.SUBRULE(this.fieldOperationValueExpression) },
            ]));

            this.RULE('parenthesisExpression', () => {
                this.CONSUME(LParen);
                this.SUBRULE(this.epxression);
                this.CONSUME(RParen);
            });

            this.RULE('fieldOperationValueExpression', () => {
                this.SUBRULE(this.fieldExpression, { LABEL: 'Field' });
                this.CONSUME(Whitespace);
                this.CONSUME(Operation);
                this.CONSUME2(Whitespace);
                this.SUBRULE(this.possibleValueExpression, { LABEL: 'Value' });
            });

            this.RULE('fieldExpression', () => {
                this.CONSUME(Field);
            });

            this.RULE('possibleValueExpression', () => this.OR([
                { ALT: () => this.SUBRULE(this.valueExpression) },
                { ALT: () => this.SUBRULE(this.quotedValueExpression) }
            ]));

            this.RULE('quotedValueExpression', () => {
                this.CONSUME(QuotedValue);
            });

            this.RULE('valueExpression', () => {
                this.CONSUME(Value);
            });

            this.RULE('whitespaceExpression', () => {
                this.CONSUME(Whitespace);
            });

            Parser.performSelfAnalysis(this);
        }
    } }[className];

    Object.defineProperty(ParserClass, 'name', { value: className });

    return new ParserClass([]);
}
