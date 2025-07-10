const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Upgradeability", function () {
  it("upgrades implementation", async function () {
    const TokenV1 = await ethers.getContractFactory("NeurixToken");
    const proxy = await upgrades.deployProxy(TokenV1, [await ethers.getSigners().then(s => s[0].address)], { initializer: "initialize" });
    const TokenV2 = await ethers.getContractFactory("NeurixToken");
    const upgraded = await upgrades.upgradeProxy(proxy.address, TokenV2);
    expect(upgraded.address).to.equal(proxy.address);
  });
});
