import "@stdlib/deploy";

extends fun isZero(self: Int): Bool {
  return self == 0;
}

extends fun addOne(self: Int): Int {
  self = (self + 1);
  return self;
}

extends mutates fun customPow(self: Int, c: Int) {
    let res: Int = 1;
    repeat(c) {
        res *= self;
    }
    self = res;
}

contract TestContract with Deployable {
  // Empty init() function is present by default in all Tact contracts
  // since v1.3.0, so the following may be omitted:
  //

  number: Int;
  init(_number: Int){
    self.number = _number;
  }

  get fun isZero(a: Int): Bool {
    return a.isZero();
  }

  get fun addOne(a: Int): Int {
    return a.addOne();
  }

  get fun customPow(a:Int, b:Int):Int {
    a.customPow(b);
    return a;
  }
}