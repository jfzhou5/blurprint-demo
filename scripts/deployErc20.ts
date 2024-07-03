import { toNano } from '@ton/core';
import { Erc20 } from '../wrappers/Erc20';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const erc20 = provider.open(await Erc20.fromInit("PAC token", "PAC"));

    await erc20.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(erc20.address);

    // run methods on `erc20`

    console.log(`provider.sender: ${provider.sender().address}`)

    console.log(`erc20 owner: ${await erc20.getOwner()}`)
    console.log(`erc20 name: ${await erc20.getName()}`)
    console.log(`erc20 symbol: ${await erc20.getSymbol()}`)
    console.log(`erc20 decimal: ${await erc20.getDecimals()}`)
    console.log(`erc20 totalSupply: ${await erc20.getTotalSupply()}`)

    console.log(`balance: ${await erc20.getBalanceOf(provider.sender().address!!)}`)
}
