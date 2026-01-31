'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { CONTRACTS } from '@/lib/blockchain/config';
import { TOKEN_CONTRACT_ABI } from '@/lib/blockchain/abis';
import { Loader2, Trophy, Coins, TrendingUp } from 'lucide-react';

interface TokenRewardProps {
  score: number;
  paymentHash: string;
  onRewardClaimed?: () => void;
}

export default function TokenReward({
  score,
  paymentHash,
  onRewardClaimed,
}: TokenRewardProps) {
  const { address } = useAccount();
  const [claimed, setClaimed] = useState(false);

  const tokensToEarn = score * 10; // 10 tokens per point

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

  const handleClaimReward = async () => {
    if (!address || !paymentHash) return;

    try {
      writeContract({
        address: CONTRACTS.TOKEN,
        abi: TOKEN_CONTRACT_ABI,
        functionName: 'mintReward',
        args: [address, BigInt(score), paymentHash as `0x${string}`],
      });
    } catch (error) {
      console.error('Claim reward error:', error);
    }
  };

  // Handle successful claim
  if (isConfirmed && !claimed) {
    setClaimed(true);
    onRewardClaimed?.();
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border-2 border-yellow-500/50">
      <div className="text-center">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        <h2 className="text-3xl font-bold text-white mb-2">
          Congratulations!
        </h2>
        <p className="text-white/80 text-lg">
          You scored {score} points!
        </p>
      </div>

      {/* Reward Display */}
      <div className="bg-white/10 rounded-xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/80">Your Reward:</span>
          <div className="flex items-center gap-2 text-yellow-400 font-bold text-2xl">
            <Coins className="w-6 h-6" />
            {tokensToEarn} SOCPT
          </div>
        </div>

        <div className="text-xs text-white/60 space-y-1">
          <div className="flex justify-between">
            <span>Base score:</span>
            <span>{score} points</span>
          </div>
          <div className="flex justify-between">
            <span>Multiplier:</span>
            <span>10x</span>
          </div>
          <div className="border-t border-white/20 pt-1 mt-1 flex justify-between font-semibold">
            <span>Total tokens:</span>
            <span>{tokensToEarn} SOCPT</span>
          </div>
        </div>
      </div>

      {/* Claim Button */}
      <Button
        onClick={handleClaimReward}
        disabled={isPending || isConfirming || claimed || !address}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-12 py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
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
            Minting Tokens...
          </>
        )}
        {claimed && (
          <>
            <Trophy className="mr-2 h-5 w-5" />
            Tokens Claimed!
          </>
        )}
        {!isPending && !isConfirming && !claimed && (
          <>
            <TrendingUp className="mr-2 h-5 w-5" />
            Claim {tokensToEarn} SOCPT
          </>
        )}
      </Button>

      {/* Error Display */}
      {writeError && (
        <div className="text-red-400 text-sm bg-red-500/20 px-4 py-2 rounded-lg border border-red-500/50">
          {writeError.message.includes('already used')
            ? 'Tokens already claimed for this quiz'
            : 'Failed to claim tokens. Please try again.'}
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
            className="text-yellow-400 hover:underline break-all"
          >
            {hash}
          </a>
        </div>
      )}

      {/* Token Utility Info */}
      <div className="text-center text-xs text-white/60 max-w-md bg-white/5 p-4 rounded-lg">
        <p className="font-semibold mb-2">💡 What can you do with SOCPT?</p>
        <ul className="text-left space-y-1">
          <li>• Access premium quizzes</li>
          <li>• Compete in seasonal tournaments</li>
          <li>• Unlock exclusive NFT rewards</li>
          <li>• Climb the global leaderboard</li>
        </ul>
      </div>
    </div>
  );
}
