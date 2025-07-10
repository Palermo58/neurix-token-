const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Mainnet Fork Tests", function () {
  before(async function () {
    // Reset Hardhat network to fork from mainnet at a specific block
    await network.provider.request({
      method: "hardhat_reset",
      params: [{
        forking: {
          jsonRpcUrl: process.env.MAINNET_RPC,
          blockNumber: 17000000
        }
      }]
    });
  });

  it("Should interact with a real mainnet contract", async function () {
    // Example: check DAI contract balance of a known address
    const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const holder = "0x47ac0Fb4F2D84898e4D9E7b4DaA4b33ADA64EcA5"; // random address
    const dai = await ethers.getContractAt("IERC20", daiAddress);
    const balance = await dai.balanceOf(holder);
    expect(balance).to.be.a("object");
  });
});
