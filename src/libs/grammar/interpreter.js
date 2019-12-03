const log = function(...args) {
    console.log(...args);
};

let interpreterCounter = 0;

const _withoutQuotes = function(value) {
    return value.startsWith('"') ? value.substr(1, value.length - 2) : value;
};

export function createInterpreter(BaseCstVisitor, fieldNames) {

    interpreterCounter++;
    const className = `InterpreterPure${interpreterCounter}`;

    const InterpreterClass = { [className]: class extends BaseCstVisitor {
        constructor() {
            super();

            if (this.__proto__.__reactstandin__regenerateByEval) delete this.__proto__.__reactstandin__regenerateByEval;
            this.validateVisitor();
        }

        expression(ctx) {
            log('expression', ctx);
            const firstResult = this.visit(ctx.lhs);
            let result;

            if (ctx.rhs) {
                ctx.rhs.forEach((rhsOperand, idx) => {
                    let rhsValue = this.visit(rhsOperand);
                    let operator = ctx.OperatorOperator[idx];
                    const query = idx === 0 ? [...firstResult, ...rhsValue] : [...rhsValue];
                    result = { operator: operator.image, query };
                });
            } else {
                result = firstResult;
            }

            return result;
        }

        atomicExpression(ctx) {
            if (ctx.parenthesisExpression) {
                return this.visit(ctx.parenthesisExpression);
            } else if (ctx.fieldOperationValueExpression) {
                return [this.visit(ctx.fieldOperationValueExpression)];
            }
        }

        parenthesisExpression(ctx) {
            return this.visit(ctx.expression);
        }

        fieldOperationValueExpression(ctx) {
            return {
                field: this.visit(ctx.Field),
                operation: _withoutQuotes(ctx.Operation[0].image),
                value: this.visit(ctx.Value),
            };
        }

        fieldExpression(ctx) {
            const image = ctx.Field[0] && ctx.Field[0].image;
            if (image) {
                const fieldName = _withoutQuotes(image);
                return fieldNames[fieldName];
            }
            return { error: 'missing field', ctx };
        }

        possibleValueExpression(ctx) {
            if (ctx.quotedValueExpression) {
                return this.visit(ctx.quotedValueExpression);
            } else if (ctx.valueExpression) {
                return this.visit(ctx.valueExpression);
            }
        }

        quotedValueExpression(ctx) {
            const image = ctx.QuotedValue[0] && ctx.QuotedValue[0].image;
            if (image) {
                return image.substr(1, image.length - 2);
            }
            return { error: 'missing value', ctx };
        }

        valueExpression(ctx) {
            if (ctx.Value[0] && ctx.Value[0].image) {
                return ctx.Value[0].image;
            }
            return { error: 'missing value', ctx };
        }

        whitespaceExpression() {
            return ' ';
        }
    } }[className];

    Object.defineProperty(InterpreterClass, 'name', { value: className });

    return new InterpreterClass();
}