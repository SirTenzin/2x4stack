import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useConvexAuth } from "@convex-dev/react-query";

export const useAuth = () => {
	const { 
		login, 
		register, 
		isAuthenticated, 
		isLoading, 
		user, 
		logout 
	} = useKindeAuth();
	
	const convexAuth = useConvexAuth();

	return {
		login,
		register,
		isAuthenticated,
		isLoading,
		user,
		logout,
		convexAuth,
	};
}; 