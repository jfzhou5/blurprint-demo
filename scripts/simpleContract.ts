import { NetworkProvider, sleep } from '@ton/blueprint';
import { Address, toNano } from '@ton/core';
import { SampleTactContract } from '../wrappers/SimpleContract';

export async function run(provider: NetworkProvider) {
    const contractAddress = Address.parse('EQCYP6U5kSYVR_XiVgJGjeTm1bUQBv4yUEvmXmA0avU-ldd7');
    const owner = provider.sender().address;
    console.log(`SimpleContract: ${contractAddress.toString({ testOnly: true })}`);
    console.log(`owner: ${owner?.toString({ testOnly: true })}`);

    const simpleContract = provider.open(SampleTactContract.fromAddress(contractAddress));
    const counterBefore = await simpleContract.getCounter();
    console.log(`counter before: ${counterBefore.toString()}`);

    // await simpleContract.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.01'),
    //     },
    //     {
    //         $$type: 'Add',
    //         amount: BigInt(1000),
    //     },
    // );
    // let newCounter = counterBefore;
    // while (newCounter === counterBefore) {
    //     newCounter = await simpleContract.getCounter();
    //     await sleep(1000);
    //     provider.ui().setActionPrompt('waiting for confirmation....\n');
    // }
    // console.log(`new counter: ${await simpleContract.getCounter()}`);

    await simpleContract.send(
        provider.sender(),
        {
            value: toNano(0.005),
            bounce: true
        },
        'increment',
    );

    provider.ui().setActionPrompt('waiting for confirmation....\n');
    await sleep(4000);
    console.log(`new counter: ${await simpleContract.getCounter()}`);
}