import { toNano } from '@ton/core';
import { TestContract } from '../wrappers/TestContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const testContract = provider.open(await TestContract.fromInit(1n));

    await testContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(testContract.address);

    // run methods on `testContract`

    console.log('getIsZero', await testContract.getIsZero(1n));
    console.log('getAddOne', await testContract.getAddOne(1n));
    console.log('customPow', await testContract.getCustomPow(2n, 2n));
}
