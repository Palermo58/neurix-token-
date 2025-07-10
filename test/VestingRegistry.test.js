const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("VestingRegistry", function () {
  let vesting, token, owner, beneficiary;
  const SCHED_ID = ethers.utils.id("schedule1");

  beforeEach(async () => {
    [owner, beneficiary] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("NeurixToken");
    token = await upgrades.deployProxy(Token, [owner.address], { initializer: "initialize" });

    const Vesting = await ethers.getContractFactory("VestingRegistry");
    vesting = await upgrades.deployProxy(Vesting, [owner.address], { initializer: "initialize" });

    // fund vesting contract
    await token.mint(vesting.address, ethers.utils.parseUnits("1000", 18));
    await vesting.createSchedule(
      SCHED_ID,
      token.address,
      beneficiary.address,
      Math.floor(Date.now() / 1000) - 1000, // start in past
      2000,
      ethers.utils.parseUnits("500", 18)
    );
  });

  it("allows beneficiary to claim vested tokens", async function () {
    await vesting.connect(beneficiary).claim(SCHED_ID);
    expect(await token.balanceOf(beneficiary.address)).to.be.above(0);
  });

  it("prevents double claim", async function () {
    await vesting.connect(beneficiary).claim(SCHED_ID);
    await expect(vesting.connect(beneficiary).claim(SCHED_ID))
      .to.be.revertedWith("Nothing to claim");
  });
});
