import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TestContract } from '../wrappers/TestContract';
import '@ton/test-utils';

describe('TestContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let testContract: SandboxContract<TestContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        testContract = blockchain.openContract(await TestContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await testContract.send(
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
            to: testContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and testContract are ready to use
    });
});
