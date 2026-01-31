const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying Soccer Quiz Pro contracts to", hre.network.name);
  console.log("━".repeat(50));

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "CELO");
  console.log("━".repeat(50));

  // Deploy SoccerPointToken
  console.log("\n📝 Deploying SoccerPointToken...");
  const SoccerPointToken = await hre.ethers.getContractFactory("SoccerPointToken");
  const token = await SoccerPointToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ SoccerPointToken deployed to:", tokenAddress);

  // Deploy PaymentContract
  console.log("\n💰 Deploying PaymentContract...");
  const PaymentContract = await hre.ethers.getContractFactory("PaymentContract");
  const payment = await PaymentContract.deploy();
  await payment.waitForDeployment();
  const paymentAddress = await payment.getAddress();
  console.log("✅ PaymentContract deployed to:", paymentAddress);

  // Configure contracts
  console.log("\n⚙️  Configuring contracts...");
  
  // Authorize PaymentContract as a verifier for itself
  console.log("Setting PaymentContract as authorized verifier...");
  await payment.setAuthorizedVerifier(paymentAddress, true);
  
  // Authorize PaymentContract to mint tokens
  console.log("Authorizing PaymentContract to mint tokens...");
  await token.setAuthorizedMinter(paymentAddress, true);
  
  // Authorize deployer as minter (for backend integration)
  console.log("Authorizing deployer as token minter...");
  await token.setAuthorizedMinter(deployer.address, true);

  console.log("\n✅ Configuration complete!");
  
  // Display summary
  console.log("\n" + "━".repeat(50));
  console.log("📋 DEPLOYMENT SUMMARY");
  console.log("━".repeat(50));
  console.log("Network:", hre.network.name);
  console.log("Chain ID:", (await hre.ethers.provider.getNetwork()).chainId);
  console.log("\n📍 Contract Addresses:");
  console.log("  SoccerPointToken:", tokenAddress);
  console.log("  PaymentContract:", paymentAddress);
  
  console.log("\n💾 Add to your .env file:");
  console.log(`NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=${tokenAddress}`);
  console.log(`NEXT_PUBLIC_PAYMENT_CONTRACT_ADDRESS=${paymentAddress}`);
  
  // Verify contracts on explorer (if not local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\n🔍 Waiting 30 seconds before verification...");
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    console.log("\n📝 Verifying contracts on block explorer...");
    try {
      await hre.run("verify:verify", {
        address: tokenAddress,
        constructorArguments: [],
      });
      console.log("✅ SoccerPointToken verified");
    } catch (error) {
      console.log("❌ Token verification failed:", error.message);
    }
    
    try {
      await hre.run("verify:verify", {
        address: paymentAddress,
        constructorArguments: [],
      });
      console.log("✅ PaymentContract verified");
    } catch (error) {
      console.log("❌ Payment verification failed:", error.message);
    }
  }
  
  console.log("\n" + "━".repeat(50));
  console.log("🎉 Deployment complete!");
  console.log("━".repeat(50));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
