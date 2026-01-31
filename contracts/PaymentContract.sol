// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PaymentContract
 * @dev Handles CELO payments for quiz access
 * Features:
 * - 0.1 CELO payment requirement
 * - Anti-replay protection
 * - Payment tracking
 * - Revenue collection
 */
contract PaymentContract is Ownable, ReentrancyGuard {
    // Payment configuration
    uint256 public constant QUIZ_FEE = 0.1 ether; // 0.1 CELO
    
    // Payment tracking
    mapping(address => uint256) public totalPayments;
    mapping(address => uint256) public lastPaymentTime;
    mapping(address => bytes32[]) public userPaymentHashes;
    mapping(bytes32 => PaymentRecord) public payments;
    
    struct PaymentRecord {
        address player;
        uint256 amount;
        uint256 timestamp;
        bool quizCompleted;
        uint256 score;
    }
    
    // Revenue tracking
    uint256 public totalRevenue;
    uint256 public totalQuizzesSold;
    
    // Authorized addresses that can mark quiz completion
    mapping(address => bool) public authorizedVerifiers;
    
    // Events
    event PaymentReceived(address indexed player, uint256 amount, bytes32 paymentHash);
    event QuizCompleted(address indexed player, bytes32 paymentHash, uint256 score);
    event RevenueWithdrawn(address indexed owner, uint256 amount);
    event VerifierAuthorized(address indexed verifier, bool status);
    
    constructor() Ownable(msg.sender) {
        // Owner is automatically authorized verifier
        authorizedVerifiers[msg.sender] = true;
    }
    
    /**
     * @dev Authorize/revoke verifier addresses
     */
    function setAuthorizedVerifier(address verifier, bool status) external onlyOwner {
        authorizedVerifiers[verifier] = status;
        emit VerifierAuthorized(verifier, status);
    }
    
    /**
     * @dev Pay for quiz access
     * @return paymentHash Unique hash for this payment
     */
    function payForQuiz() external payable nonReentrant returns (bytes32) {
        require(msg.value == QUIZ_FEE, "Incorrect payment amount");
        
        // Generate unique payment hash
        bytes32 paymentHash = keccak256(
            abi.encodePacked(
                msg.sender,
                block.timestamp,
                block.number,
                totalQuizzesSold
            )
        );
        
        // Record payment
        payments[paymentHash] = PaymentRecord({
            player: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            quizCompleted: false,
            score: 0
        });
        
        // Update user tracking
        totalPayments[msg.sender]++;
        lastPaymentTime[msg.sender] = block.timestamp;
        userPaymentHashes[msg.sender].push(paymentHash);
        
        // Update global stats
        totalRevenue += msg.value;
        totalQuizzesSold++;
        
        emit PaymentReceived(msg.sender, msg.value, paymentHash);
        
        return paymentHash;
    }
    
    /**
     * @dev Mark quiz as completed (called by authorized verifier)
     * @param paymentHash Payment hash from payForQuiz()
     * @param player Player address (verification)
     * @param score Final quiz score
     */
    function completeQuiz(
        bytes32 paymentHash,
        address player,
        uint256 score
    ) external {
        require(authorizedVerifiers[msg.sender], "Not authorized verifier");
        require(payments[paymentHash].player == player, "Player mismatch");
        require(!payments[paymentHash].quizCompleted, "Quiz already completed");
        require(score <= 100, "Invalid score");
        
        // Mark as completed
        payments[paymentHash].quizCompleted = true;
        payments[paymentHash].score = score;
        
        emit QuizCompleted(player, paymentHash, score);
    }
    
    /**
     * @dev Verify if payment is valid and unused
     */
    function isPaymentValid(bytes32 paymentHash, address player) external view returns (bool) {
        PaymentRecord memory record = payments[paymentHash];
        return (
            record.player == player &&
            record.amount == QUIZ_FEE &&
            !record.quizCompleted
        );
    }
    
    /**
     * @dev Get payment details
     */
    function getPaymentDetails(bytes32 paymentHash) external view returns (
        address player,
        uint256 amount,
        uint256 timestamp,
        bool completed,
        uint256 score
    ) {
        PaymentRecord memory record = payments[paymentHash];
        return (
            record.player,
            record.amount,
            record.timestamp,
            record.quizCompleted,
            record.score
        );
    }
    
    /**
     * @dev Get user's payment history
     */
    function getUserPayments(address user) external view returns (bytes32[] memory) {
        return userPaymentHashes[user];
    }
    
    /**
     * @dev Get user statistics
     */
    function getUserStats(address user) external view returns (
        uint256 totalPaid,
        uint256 quizzesPurchased,
        uint256 lastPayment
    ) {
        return (
            totalPayments[user] * QUIZ_FEE,
            totalPayments[user],
            lastPaymentTime[user]
        );
    }
    
    /**
     * @dev Get contract statistics
     */
    function getContractStats() external view returns (
        uint256 revenue,
        uint256 quizzesSold,
        uint256 balance
    ) {
        return (
            totalRevenue,
            totalQuizzesSold,
            address(this).balance
        );
    }
    
    /**
     * @dev Withdraw revenue (owner only)
     */
    function withdrawRevenue(uint256 amount) external onlyOwner nonReentrant {
        require(amount <= address(this).balance, "Insufficient balance");
        
        (bool success, ) = owner().call{value: amount}("");
        require(success, "Withdraw failed");
        
        emit RevenueWithdrawn(owner(), amount);
    }
    
    /**
     * @dev Withdraw all revenue (owner only)
     */
    function withdrawAll() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");
        
        emit RevenueWithdrawn(owner(), balance);
    }
    
    /**
     * @dev Receive function to accept CELO
     */
    receive() external payable {
        revert("Use payForQuiz() function");
    }
}
