import { useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

// Custom hook that adapts Kinde auth to Convex auth interface
function useKindeConvexAuth() {
  const { getToken, isAuthenticated, isLoading } = useKindeAuth();
  
  const fetchAccessToken = useCallback(
    // @ts-expect-error - forceRefreshToken is not used
    async ({ forceRefreshToken }: { forceRefreshToken: boolean }) => {
      if (!isAuthenticated || isLoading) {
        return null;
      }
      
      try {
        const token = await getToken();
        
        return token || null;
      } catch (error) {
        console.error("❌ Failed to fetch token:", error);
        return null;
      }
    },
    [getToken, isAuthenticated, isLoading]
  );

  return useMemo(
    () => ({
      isLoading: isLoading ?? false,
      isAuthenticated: isAuthenticated ?? false,
      fetchAccessToken,
    }),
    [isLoading, isAuthenticated, fetchAccessToken]
  );
}

const ConvexAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConvexProviderWithAuth client={convex} useAuth={useKindeConvexAuth}>
      {children}
    </ConvexProviderWithAuth>
  );
};

export default ConvexAuthProvider;
