import { useState } from "react";
import Select from "react-select";

function AccountSelect() {
  const options = [
    { value: "Account 1", label: "Account 1" },
    { value: "Account 2", label: "Account 2" },
  ];
  const [account, setAccount] = useState(options[0]);

  const handleAccount = (account: any) => {
    setAccount(account);
  };

  return (
      <Select
        value={account}
        className="accountSelect"
        options={options}
        onChange={handleAccount}
      />
  );
}

export default AccountSelect;
