import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Erc20 } from '../wrappers/Erc20';
import '@ton/test-utils';

describe('Erc20', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let erc20: SandboxContract<Erc20>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        erc20 = blockchain.openContract(await Erc20.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await erc20.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: erc20.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and erc20 are ready to use
    });
});
