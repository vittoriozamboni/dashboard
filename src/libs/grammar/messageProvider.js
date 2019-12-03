export function createMessageProvider() {
    return {
        buildMismatchTokenMessage(options) {
            return [options.expected];
        },
        buildNotAllInputParsedMessage(options) {
            if (options.firstRedundant) {
                return [options.firstRedundant];
            }

            return options.expectedPathsPerAlt.map(e => e[0]).map(e => e[0]);
        },
        buildEarlyExitMessage(options) {
            return options.expectedPathsPerAlt.map(e => e[0]).map(e => e[0]);
        },
        buildNotViableAltMessage(options) {
            return options.expectedPathsPerAlt.map(e => e[0]).map(e => e[0]);
        }
    };
}