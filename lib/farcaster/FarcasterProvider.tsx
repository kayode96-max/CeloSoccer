'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import sdk from '@farcaster/frame-sdk';

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface FarcasterContextType {
  isSDKLoaded: boolean;
  user: FarcasterUser | null;
  isFrameContext: boolean;
}

const FarcasterContext = createContext<FarcasterContextType>({
  isSDKLoaded: false,
  user: null,
  isFrameContext: false,
});

export function useFarcaster() {
  return useContext(FarcasterContext);
}

export function FarcasterProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isFrameContext, setIsFrameContext] = useState(false);

  useEffect(() => {
    const initSDK = async () => {
      try {
        // Check if running in Farcaster frame context
        const context = await sdk.context;
        setIsFrameContext(!!context);

        if (context?.user) {
          setUser({
            fid: context.user.fid,
            username: context.user.username,
            displayName: context.user.displayName,
            pfpUrl: context.user.pfpUrl,
          });
        }

        // Initialize the SDK
        await sdk.actions.ready();
        setIsSDKLoaded(true);
      } catch (error) {
        console.error('Farcaster SDK initialization error:', error);
        setIsFrameContext(false);
        setIsSDKLoaded(true); // Still mark as loaded for non-frame context
      }
    };

    initSDK();
  }, []);

  return (
    <FarcasterContext.Provider value={{ isSDKLoaded, user, isFrameContext }}>
      {children}
    </FarcasterContext.Provider>
  );
}

export { sdk };
