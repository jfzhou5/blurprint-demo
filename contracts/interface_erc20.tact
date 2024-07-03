trait InterfaceErc20 {
  virtual fun _balanceOf(user: Address): Int {
    return 0;
  }

  abstract fun _approve(spender: Address, amount: Int);
}