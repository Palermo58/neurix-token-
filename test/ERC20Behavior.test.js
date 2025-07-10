const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("NeurixToken ERC20 behavior", function () {
  let Token, token, owner, addr1;

  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    Token = await ethers.getContractFactory("NeurixToken");
    token = await upgrades.deployProxy(Token, [owner.address], { initializer: "initialize" });
    await token.deployed();
  });

  it("has correct name and symbol and total supply", async function () {
    expect(await token.name()).to.equal("Neurix Token");
    expect(await token.symbol()).to.equal("NRX");
    expect(await token.totalSupply()).to.equal(ethers.utils.parseUnits("10000000", 18));
  });

  it("transfer reduces balance", async function () {
    await token.transfer(addr1.address, 100);
    expect(await token.balanceOf(addr1.address)).to.equal(100);
  });

  it("approve and transferFrom works", async function () {
    await token.approve(addr1.address, 200);
    await token.connect(addr1).transferFrom(owner.address, addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);
  });
});
