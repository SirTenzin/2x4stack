import { useAuth } from "./useAuth";
import { useNumbers } from "./useNumbers";
import { useUserData } from "./useUserData";

interface UseRandomNumbersProps {
	handleUpgrade?: () => void;
}

export const useRandomNumbers = ({ handleUpgrade }: UseRandomNumbersProps = {}) => {
	const auth = useAuth();
	const numbers = useNumbers({ handleUpgrade });
	const userData = useUserData();

	return {
		// Numbers functionality
		data: numbers.data,
		isPending: numbers.isPending,
		deleteById: numbers.deleteById,
		handleGenerateRandom: numbers.handleGenerateRandom,
		
		// User data
		currentConvexUser: userData.currentConvexUser,
		
		// Authentication
		login: auth.login,
		register: auth.register,
		isAuthenticated: auth.isAuthenticated,
		isLoading: auth.isLoading,
		user: auth.user,
		logout: auth.logout,
		convexAuth: auth.convexAuth,
	};
};
