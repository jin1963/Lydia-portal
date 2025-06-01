
let account;
const contractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
const abi = [ /* ABI will be inserted here */ ];

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      account = accounts[0];
      document.getElementById("walletAddress").innerText = account.slice(0, 6) + "..." + account.slice(-4);
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(abi, contractAddress);
      updateData();
    } catch (error) {
      alert("Connection failed!");
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function updateData() {
  const staked = await contract.methods.balanceOf(account).call();
  const earned = await contract.methods.earned(account).call();
  document.getElementById("stakedAmount").innerText = web3.utils.fromWei(staked);
  document.getElementById("earnedAmount").innerText = web3.utils.fromWei(earned);
}

async function stakeTokens() {
  const amount = document.getElementById("stakeInput").value;
  if (!amount) return alert("Enter amount to stake");
  await contract.methods.stake(web3.utils.toWei(amount)).send({ from: account });
  updateData();
}

async function claimRewards() {
  await contract.methods.getReward().send({ from: account });
  updateData();
}

async function withdrawTokens() {
  await contract.methods.withdrawAll().send({ from: account });
  updateData();
}
