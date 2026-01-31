'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from '@/components/ui/button';
import { CONTRACTS, QUIZ_FEE } from '@/lib/blockchain/config';
import { PAYMENT_CONTRACT_ABI } from '@/lib/blockchain/abis';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface PaymentGatewayProps {
  onPaymentSuccess: (paymentHash: string) => void;
  onPaymentError?: (error: Error) => void;
}

export default function PaymentGateway({
  onPaymentSuccess,
  onPaymentError,
}: PaymentGatewayProps) {
  const { address, isConnected } = useAccount();
  const [paymentHash, setPaymentHash] = useState<string>('');

  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handlePayment = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      writeContract({
        address: CONTRACTS.PAYMENT,
        abi: PAYMENT_CONTRACT_ABI,
        functionName: 'payForQuiz',
        value: parseEther(QUIZ_FEE),
      });
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError?.(error as Error);
    }
  };

  // Handle successful payment
  if (isConfirmed && hash && !paymentHash) {
    // Generate payment hash from transaction hash
    const pHash = hash;
    setPaymentHash(pHash);
    onPaymentSuccess(pHash);
  }

  // Handle payment error
  if (writeError) {
    console.error('Write error:', writeError);
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border-2 border-emerald-500/50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          🎮 Ready to Play?
        </h2>
        <p className="text-white/80 text-lg">
          Pay {QUIZ_FEE} CELO to unlock the quiz
        </p>
      </div>

      {/* Payment Status */}
      {!isConnected && (
        <div className="text-yellow-400 text-sm">
          ⚠️ Please connect your wallet first
        </div>
      )}

      {/* Payment Button */}
      <Button
        onClick={handlePayment}
        disabled={!isConnected || isPending || isConfirming || isConfirmed}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xl px-12 py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
      >
        {isPending && (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Confirm in Wallet...
          </>
        )}
        {isConfirming && (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing Payment...
          </>
        )}
        {isConfirmed && (
          <>
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Payment Successful!
          </>
        )}
        {!isPending && !isConfirming && !isConfirmed && (
          <>💰 Pay {QUIZ_FEE} CELO</>
        )}
      </Button>

      {/* Error Display */}
      {writeError && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/50">
          <XCircle className="h-4 w-4" />
          <span className="text-sm">
            {writeError.message.includes('insufficient funds')
              ? 'Insufficient CELO balance'
              : 'Payment failed. Please try again.'}
          </span>
        </div>
      )}

      {/* Transaction Hash */}
      {hash && (
        <div className="text-xs text-white/60 mt-2 max-w-full overflow-hidden">
          <span className="font-semibold">Transaction:</span>{' '}
          <a
            href={`https://alfajores.celoscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline break-all"
          >
            {hash}
          </a>
        </div>
      )}

      {/* Help Text */}
      <div className="text-center text-xs text-white/60 max-w-md">
        <p>
          💡 Need testnet CELO?{' '}
          <a
            href="https://faucet.celo.org/alfajores"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline"
          >
            Get free tokens from the faucet
          </a>
        </p>
      </div>
    </div>
  );
}
