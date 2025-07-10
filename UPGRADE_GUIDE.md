# Upgrade Guide

This guide explains how to perform a UUPS proxy upgrade for the NeurixToken contract.

1. Develop and test your new implementation contract.
2. In `scripts/upgrade.js`, set the new contract factory:
   ```js
   const { ethers, upgrades } = require("hardhat");
   async function main() {
     const impl = await ethers.getContractFactory("NeurixTokenV2");
     await upgrades.upgradeProxy(process.env.NEURIX_PROXY_ADDRESS, impl);
     console.log("Proxy upgraded to new implementation");
   }
   main();
   ```
3. Run the upgrade:
   ```bash
   npx hardhat run scripts/upgrade.js --network <network>
   ```
4. Verify that the proxy address remains unchanged and new functions are active.
