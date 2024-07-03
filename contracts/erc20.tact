import "@stdlib/deploy";
import "./interface_erc20.tact";

struct SpenderAllowance {
    allowance: map<Address, Int>;
}
message Transfer {
    recipient: Address;
    amount: Int;
}
message Approve {
    spender: Address;
    amount: Int;
}
message TransferFrom {
    sender: Address;
    recipient: Address;
    amount: Int;
}

message Mint {
    to: Address;
    amount: Int;
}

contract Erc20 with Deployable, InterfaceErc20 {
    owner: Address;
    name: String;
    symbol: String;
    decimals: Int as int8 = 9;
    totalSupply: Int;
    balances: map<Address, Int>;
    allowances: map<Address, SpenderAllowance>;
    init(name: String, symbol: String){
        self.owner = context().sender;
        self.name = name;
        self.symbol = symbol;
        self.totalSupply = 0;
        self._mint(Mint{to: self.owner, amount: ton("10000")});
    }

    get fun owner(): Address {
        return self.owner;
    }
    
    get fun name(): String {
        return self.name;
    }

    get fun symbol(): String {
        return self.symbol;
    }

    get fun decimals(): Int {
        return self.decimals;
    }

    get fun totalSupply(): Int {
        return self.totalSupply;
    }

    get fun balanceOf(user: Address): Int {
        return self._balanceOf(user);
    }

    get fun allowane(owner: Address, spender: Address): Int {
        return self._allowance(owner, spender);
    }

    override fun _balanceOf(user: Address): Int {
        return self.balances.get(user) != null ? self.balances.get(user)!! : 0;
    }

    fun _allowance(owner: Address, spender: Address): Int {
        let ownerAllowance: SpenderAllowance? = self.allowances.get(owner);
        if (ownerAllowance == null) {
            return 0;
        }
        let spenderAllowance: Int? = ownerAllowance!!.allowance.get(spender);
        return spenderAllowance != null ? spenderAllowance!! : 0; 
    }

    fun _mint(message: Mint) {
        require(context().sender == self.owner, "Caller is not the owner");
        self.balances.set(message.to, self._balanceOf(message.to) + message.amount);
        self.totalSupply += message.amount;
    }

    override fun _approve(spender: Address, amount: Int) {
        let owner:Address = context().sender;
        let ownerAllowance: SpenderAllowance = self.allowances.get(owner) == null ? 
            SpenderAllowance{ allowance: emptyMap() }: 
            self.allowances.get(owner)!!;
        ownerAllowance.allowance.set(spender, amount);
    }



    receive(message: Mint) {
        self._mint(message);
    }

    receive(message: Transfer){
        let sender: Address = context().sender;
        let senderBalance: Int = self._balanceOf(sender);
        if (senderBalance == null || senderBalance < message.amount) {
            dump("sender balance not enough");
            return;
        }
        self.balances.set(sender, (senderBalance - message.amount));
        self.balances.set(message.recipient, self._balanceOf(message.recipient) + message.amount);
    }

    receive(message: TransferFrom) {
        // let sender: Address = context().sender;
        // let senderBalance: Int = self._balanceOf(sender);
        // if (senderBalance == null || senderBalance < message.amount) {
        //     dump("sender balance not enough");
        //     return;
        // }
        // self.balances.set(sender, (senderBalance - message.amount));
        // self.balances.set(message.recipient, self._balanceOf(message.recipient) + message.amount);
    }

    receive(message: Approve) {
        self._approve(message.spender, message.amount);
    }

}