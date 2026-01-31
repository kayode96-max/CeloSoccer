// ABI for PaymentContract
export const PAYMENT_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "bytes32", "name": "paymentHash", "type": "bytes32"}
    ],
    "name": "PaymentReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
      {"indexed": false, "internalType": "bytes32", "name": "paymentHash", "type": "bytes32"},
      {"indexed": false, "internalType": "uint256", "name": "score", "type": "uint256"}
    ],
    "name": "QuizCompleted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "QUIZ_FEE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "payForQuiz",
    "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "paymentHash", "type": "bytes32"},
      {"internalType": "address", "name": "player", "type": "address"},
      {"internalType": "uint256", "name": "score", "type": "uint256"}
    ],
    "name": "completeQuiz",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "paymentHash", "type": "bytes32"},
      {"internalType": "address", "name": "player", "type": "address"}
    ],
    "name": "isPaymentValid",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "bytes32", "name": "paymentHash", "type": "bytes32"}
    ],
    "name": "getPaymentDetails",
    "outputs": [
      {"internalType": "address", "name": "player", "type": "address"},
      {"internalType": "uint256", "name": "amount", "type": "uint256"},
      {"internalType": "uint256", "name": "timestamp", "type": "uint256"},
      {"internalType": "bool", "name": "completed", "type": "bool"},
      {"internalType": "uint256", "name": "score", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "user", "type": "address"}
    ],
    "name": "getUserStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalPaid", "type": "uint256"},
      {"internalType": "uint256", "name": "quizzesPurchased", "type": "uint256"},
      {"internalType": "uint256", "name": "lastPayment", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// ABI for SoccerPointToken
export const TOKEN_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "score", "type": "uint256"},
      {"indexed": false, "internalType": "bytes32", "name": "paymentHash", "type": "bytes32"}
    ],
    "name": "TokensMinted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "account", "type": "address"}
    ],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "player", "type": "address"},
      {"internalType": "uint256", "name": "score", "type": "uint256"},
      {"internalType": "bytes32", "name": "paymentHash", "type": "bytes32"}
    ],
    "name": "mintReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "player", "type": "address"}
    ],
    "name": "canMint",
    "outputs": [
      {"internalType": "bool", "name": "", "type": "bool"},
      {"internalType": "string", "name": "", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "player", "type": "address"}
    ],
    "name": "getPlayerStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalQuizzes", "type": "uint256"},
      {"internalType": "uint256", "name": "tokensEarned", "type": "uint256"},
      {"internalType": "uint256", "name": "dailyMints", "type": "uint256"},
      {"internalType": "uint256", "name": "lastMint", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
