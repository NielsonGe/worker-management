import Account from "@/models/Account";

interface LoginAccount {
  username: string;
  password: string;
  account: Account;
  token: string;
}

const accountList: LoginAccount[] = [
  {
    username: 'account1',
    password: '123',
    account: new Account('1', '张三'),
    token: 'd2f7d29a-9074-425d-a91e-16adb912e8c9'
  },
  {
    username: 'account2',
    password: '123',
    account: new Account('2', '李四'),
    token: '6354cf6d-71e4-42cb-8362-f647ca14d4fc'
  }
]

const findAccount = (username: string | null, password: string | null): LoginAccount | null | undefined => {
  const loginAccount: LoginAccount | null | undefined = accountList.find(x => x.username == username && x.password == password);
  return loginAccount;
}

export {LoginAccount, findAccount}