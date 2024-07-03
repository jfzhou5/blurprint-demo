import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/erc20.tact',
    options: {
        debug: true,
    },
};
