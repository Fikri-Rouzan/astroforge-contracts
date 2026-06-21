// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract AstroForgeToken is ERC20, Ownable {
    using ECDSA for bytes32;

    address public backendSigner;
    mapping(address => uint256) public playerNonces;

    event TokensWithdrawn(address indexed player, uint256 amount, uint256 indexed nonce);
    event SignerUpdated(address indexed oldSigner, address indexed newSigner);

    constructor(address _initialSigner) ERC20("AstroForge Ore", "ORE") Ownable(msg.sender) {
        require(_initialSigner != address(0), "Invalid signer address");
        backendSigner = _initialSigner;
    }

    /**
     * @notice Allows players to mint tokens directly by providing a valid backend cryptographic voucher
     */
    function withdrawTokens(
        address recipient,
        uint256 amount,
        uint256 nonce,
        uint256 expiry,
        bytes calldata signature
    ) external {
        require(block.timestamp <= expiry, "Voucher has expired");
        require(nonce == playerNonces[recipient], "Invalid or reuse of security nonce");

        bytes32 messageHash = keccak256(
            abi.encodePacked(recipient, amount, nonce, expiry, address(this))
        );

        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(messageHash);

        address recoveredSigner = ethSignedMessageHash.recover(signature);
        require(recoveredSigner == backendSigner, "Cryptographic signature mismatch. Fraud detected.");

        playerNonces[recipient] += 1;
        _mint(recipient, amount);

        emit TokensWithdrawn(recipient, amount, nonce);
    }

    /**
     * @notice Allows the contract owner to rotate the authorized backend signing wallet if compromised
     */
    function updateBackendSigner(address _newSigner) external onlyOwner {
        require(_newSigner != address(0), "Invalid signer address");
        emit SignerUpdated(backendSigner, _newSigner);
        backendSigner = _newSigner;
    }
}
