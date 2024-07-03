import { Address, toNano } from '@ton/core';
import { SampleTactContract } from '../wrappers/SimpleContract';
import { NetworkProvider } from '@ton/blueprint';

// export async function run(provider: NetworkProvider) {
//     const simpleCounter = provider.open(await SimpleCounter.fromInit(BigInt(Math.floor(Math.random() * 10000))));

//     await simpleCounter.send(
//         provider.sender(),
//         {
//             value: toNano('0.05'),
//         },
//         {
//             $$type: 'Deploy',
//             queryId: 0n,
//         }
//     );

//     await provider.waitForDeploy(simpleCounter.address);

//     console.log('ID', await simpleCounter.getId());
// }

export async function run(provider: NetworkProvider) {
    const address = Address.parse('0QC6ZoTJhj-ywv-94u49LxtIQaDlxAkoxISq43WxUyiNzoV3');
    const simpleContract = provider.open(await SampleTactContract.fromInit(address));
    console.log('provider.sender.address', provider.sender().address);
    await simpleContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );
    await provider.waitForDeploy(simpleContract.address);
    console.log('counter', await simpleContract.getCounter());
    console.log('owner', await simpleContract.getOwner());
}
