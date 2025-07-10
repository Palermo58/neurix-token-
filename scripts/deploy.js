const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("NeurixToken");
  const token = await upgrades.deployProxy(Token, [deployer.address], { initializer: "initialize" });
  await token.deployed();
  console.log("NeurixToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
