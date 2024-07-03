import { NetworkProvider, sleep } from '@ton/blueprint';
import { Erc20 } from '../wrappers/Erc20';
import { Address, openContract, toNano } from '@ton/core';
import { TonClient4, WalletContractV4 } from '@ton/ton';

export async function run(provider: NetworkProvider) {
    const erc20Address = Address.parse('EQBV1sMup5NiBJVMlox8ZLU0x643y3ScLQIcbivzEySCBiFN');
    const erc20 = provider.open(Erc20.fromAddress(erc20Address));

    console.log(`provider.sender: ${provider.sender().address}`);

    console.log(`erc20 owner: ${await erc20.getOwner()}`);
    console.log(`erc20 name: ${await erc20.getName()}`);
    console.log(`erc20 symbol: ${await erc20.getSymbol()}`);
    console.log(`erc20 decimal: ${await erc20.getDecimals()}`);
    console.log(`erc20 totalSupply: ${await erc20.getTotalSupply()}`);

    console.log(`balance: ${await erc20.getBalanceOf(provider.sender().address!!)}`);
    console.log(`balance: ${await erc20.getBalanceOf(erc20Address)}`);

    // await erc20.send(
    //     provider.sender(),
    //     {
    //         value: toNano('0.005'),
    //     },
    //     {
    //         $$type: 'Mint',
    //         to: await erc20.getOwner(),
    //         amount: toNano('200'),
    //     },
    // );

    await erc20.send(
        provider.sender(),
        {
            value: toNano('0.007'),
        },
        {
            $$type: 'Transfer',
            recipient: erc20Address,
            amount: toNano('200'),
        },
    );

    await sleep(15000);
    console.log(`balance: ${await erc20.getBalanceOf(provider.sender().address!!)}`);
    console.log(`balance: ${await erc20.getBalanceOf(erc20Address)}`);
}
