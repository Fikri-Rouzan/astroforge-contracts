import { expect } from "chai";
import hre from "hardhat";
import type { AstroForgeToken } from "../types/ethers-contracts/index.js";

describe("AstroForgeToken GameFi Security Test", function () {
  let tokenContract: AstroForgeToken;
  let owner: any;
  let backendSigner: any;
  let player: any;
  let ethers: any;

  beforeEach(async function () {
    // Explicitly instantiate the network context to fetch ethers
    const networkContext = await (hre as any).network.create();
    ethers = networkContext.ethers;

    // Get default Hardhat network accounts
    [owner, player] = await ethers.getSigners();

    // Generate a random secure wallet
    backendSigner = ethers.Wallet.createRandom();

    // Deploy the Smart Contract passing the backend signer public address
    const AstroForgeTokenFactory =
      await ethers.getContractFactory("AstroForgeToken");
    tokenContract = (await AstroForgeTokenFactory.deploy(
      backendSigner.address,
    )) as AstroForgeToken;
    await tokenContract.waitForDeployment();
  });

  it("Should ALLOW a player to claim tokens with a VALID backend voucher", async function () {
    const contractAddress = await tokenContract.getAddress();
    const expectedTokenAmountInWei = ethers.parseEther("4");
    const nonce = 0;
    const expiry = Math.floor(Date.now() / 1000) + 600;

    // Recreate the precise cryptographic hash packed
    const messageHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint256", "uint256", "address"],
      [
        player.address,
        expectedTokenAmountInWei,
        nonce,
        expiry,
        contractAddress,
      ],
    );

    // Sign the hash
    const signature = await backendSigner.signMessage(
      ethers.getBytes(messageHash),
    );

    // Execute the blockchain claim transaction from the player's wallet
    await expect(
      tokenContract
        .connect(player)
        .withdrawTokens(
          player.address,
          expectedTokenAmountInWei,
          nonce,
          expiry,
          signature,
        ),
    )
      .to.emit(tokenContract, "TokensWithdrawn")
      .withArgs(player.address, expectedTokenAmountInWei, nonce);

    // Verify the player actually received
    const playerBalance = await tokenContract.balanceOf(player.address);
    expect(playerBalance).to.equal(expectedTokenAmountInWei);

    // Verify the security nonce incremented
    const nextNonce = await tokenContract.playerNonces(player.address);
    expect(nextNonce).to.equal(1);
  });

  it("Should REJECT a fraud attempt if a player uses an INVALID signature", async function () {
    const contractAddress = await tokenContract.getAddress();
    const amountInWei = ethers.parseEther("100");
    const nonce = 0;
    const expiry = Math.floor(Date.now() / 1000) + 600;

    // Fake signer key
    const hackerFakeSigner = ethers.Wallet.createRandom();
    const badHash = ethers.solidityPackedKeccak256(
      ["address", "uint256", "uint256", "uint256", "address"],
      [player.address, amountInWei, nonce, expiry, contractAddress],
    );
    const fakeSignature = await hackerFakeSigner.signMessage(
      ethers.getBytes(badHash),
    );

    // Blockchain must reject and revert the transaction
    await expect(
      tokenContract
        .connect(player)
        .withdrawTokens(
          player.address,
          amountInWei,
          nonce,
          expiry,
          fakeSignature,
        ),
    ).to.be.revertedWith("Cryptographic signature mismatch. Fraud detected.");
  });
});
