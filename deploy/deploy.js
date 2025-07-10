const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const Neurix = await ethers.getContractFactory("NeurixToken");
  const neurix = await upgrades.deployProxy(Neurix, [deployer.address], { initializer: 'initialize' });
  await neurix.deployed();
  console.log("Proxy deployed at:", neurix.address);

  const VestingRegistry = await ethers.getContractFactory("VestingRegistry");
  const registry = await VestingRegistry.deploy();
  await registry.deployed();
  console.log("VestingRegistry at:", registry.address);

  const now = Math.floor(Date.now() / 1000);
  await neurix.grantRole(await neurix.MINTER_ROLE(), registry.address);

  await registry.createVesting(neurix.address, process.env.TEAM_WALLET, now, 365*86400, ethers.utils.parseUnits("6000000",18));
  await registry.createVesting(neurix.address, process.env.MARKETING_WALLET, now, 180*86400, ethers.utils.parseUnits("5000000",18));

  console.log("Vesting contracts created.");
}

main().catch(err => { console.error(err); process.exit(1); });