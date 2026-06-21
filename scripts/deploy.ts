import hre from "hardhat";

async function main() {
  // Explicitly instantiate the network context
  const networkContext = await (hre as any).network.create();
  const ethers = networkContext.ethers;

  // Fetch the deployer wallet account execution context
  const [deployer] = await ethers.getSigners();
  console.log(
    `[AstroForge Deployment] Launching contract from: ${deployer.address}`,
  );

  // Set the authorized backend server address allowed to sign game vouchers
  const initialBackendSigner = deployer.address;

  // Trigger the smart contract deployment process onto the target EVM network
  console.log("[AstroForge Deployment] Deploying AstroForgeToken...");
  const AstroForgeTokenFactory =
    await ethers.getContractFactory("AstroForgeToken");
  const token = await AstroForgeTokenFactory.deploy(initialBackendSigner);

  await token.waitForDeployment();
  const contractAddress = await token.getAddress();

  console.log("\n====================================================");
  console.log("🚀 ASTROFORGE SMART CONTRACT DEPLOYED SUCCESSFULLY!");
  console.log(`📍 Contract Address : ${contractAddress}`);
  console.log(`🔑 Authorized Signer : ${initialBackendSigner}`);
  console.log("====================================================\n");
}

main().catch((error) => {
  console.error("[Deployment Error]:", error);
  process.exitCode = 1;
});
