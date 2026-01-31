// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title SoccerPointToken
 * @dev ERC-20 reward token for Soccer Quiz Pro game
 * Features:
 * - Minting based on quiz scores
 * - Anti-double-mint protection
 * - Controlled supply management
 * - Future utility integration ready
 */
contract SoccerPointToken is ERC20, Ownable, ReentrancyGuard {
    // Token economics
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant TOKENS_PER_POINT = 10 * 10**18; // 10 tokens per quiz point
    
    // Anti-cheat tracking
    mapping(address => uint256) public lastMintTimestamp;
    mapping(address => uint256) public totalQuizzesPlayed;
    mapping(bytes32 => bool) public usedPaymentHashes; // Track used payment transactions
    
    // Rate limiting
    uint256 public constant MINT_COOLDOWN = 5 minutes; // Prevent spam
    uint256 public constant MAX_DAILY_MINTS = 10; // Max quizzes per day
    mapping(address => uint256) public dailyMintCount;
    mapping(address => uint256) public lastDayReset;
    
    // Authorized minters (game contract, backend verifier)
    mapping(address => bool) public authorizedMinters;
    
    // Events
    event TokensMinted(address indexed player, uint256 amount, uint256 score, bytes32 paymentHash);
    event MinterAuthorized(address indexed minter, bool status);
    event EmergencyWithdraw(address indexed owner, uint256 amount);
    
    constructor() ERC20("Soccer Point", "SOCPT") Ownable(msg.sender) {
        // Mint initial supply for rewards pool
        _mint(msg.sender, MAX_SUPPLY / 10); // 10% initial supply
    }
    
    /**
     * @dev Authorize/revoke minter addresses (game contracts, backend)
     */
    function setAuthorizedMinter(address minter, bool status) external onlyOwner {
        authorizedMinters[minter] = status;
        emit MinterAuthorized(minter, status);
    }
    
    /**
     * @dev Mint tokens based on quiz score
     * @param player Address of the player
     * @param score Quiz score (0-100)
     * @param paymentHash Hash of the payment transaction (prevents double-claim)
     */
    function mintReward(
        address player,
        uint256 score,
        bytes32 paymentHash
    ) external nonReentrant {
        require(authorizedMinters[msg.sender], "Not authorized minter");
        require(player != address(0), "Invalid player address");
        require(score <= 100, "Invalid score");
        require(!usedPaymentHashes[paymentHash], "Payment already used");
        
        // Rate limiting checks
        _checkRateLimit(player);
        
        // Calculate reward amount
        uint256 rewardAmount = score * TOKENS_PER_POINT;
        
        // Check supply limit
        require(totalSupply() + rewardAmount <= MAX_SUPPLY, "Max supply exceeded");
        
        // Mark payment as used (anti-replay)
        usedPaymentHashes[paymentHash] = true;
        
        // Update player stats
        lastMintTimestamp[player] = block.timestamp;
        totalQuizzesPlayed[player]++;
        
        // Update daily tracking
        dailyMintCount[player]++;
        
        // Mint tokens
        _mint(player, rewardAmount);
        
        emit TokensMinted(player, rewardAmount, score, paymentHash);
    }
    
    /**
     * @dev Internal rate limiting check
     */
    function _checkRateLimit(address player) internal {
        // Reset daily counter if new day
        if (block.timestamp >= lastDayReset[player] + 1 days) {
            dailyMintCount[player] = 0;
            lastDayReset[player] = block.timestamp;
        }
        
        // Check cooldown
        require(
            block.timestamp >= lastMintTimestamp[player] + MINT_COOLDOWN,
            "Mint cooldown active"
        );
        
        // Check daily limit
        require(
            dailyMintCount[player] < MAX_DAILY_MINTS,
            "Daily mint limit reached"
        );
    }
    
    /**
     * @dev Check if player can mint (for frontend validation)
     */
    function canMint(address player) external view returns (bool, string memory) {
        // Check daily reset
        if (block.timestamp >= lastDayReset[player] + 1 days) {
            return (true, "Can mint");
        }
        
        // Check cooldown
        if (block.timestamp < lastMintTimestamp[player] + MINT_COOLDOWN) {
            uint256 remaining = (lastMintTimestamp[player] + MINT_COOLDOWN) - block.timestamp;
            return (false, string(abi.encodePacked("Cooldown: ", _uintToString(remaining), "s")));
        }
        
        // Check daily limit
        if (dailyMintCount[player] >= MAX_DAILY_MINTS) {
            return (false, "Daily limit reached");
        }
        
        return (true, "Can mint");
    }
    
    /**
     * @dev Get player statistics
     */
    function getPlayerStats(address player) external view returns (
        uint256 totalQuizzes,
        uint256 tokensEarned,
        uint256 dailyMints,
        uint256 lastMint
    ) {
        return (
            totalQuizzesPlayed[player],
            balanceOf(player),
            dailyMintCount[player],
            lastMintTimestamp[player]
        );
    }
    
    /**
     * @dev Emergency withdraw (owner only, for stuck funds)
     */
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");
        
        emit EmergencyWithdraw(owner(), balance);
    }
    
    /**
     * @dev Utility function to convert uint to string
     */
    function _uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
