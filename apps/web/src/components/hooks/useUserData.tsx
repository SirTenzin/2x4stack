import { useConvexQuery } from "@convex-dev/react-query";
import { api } from "@2x4/backend/convex/_generated/api";

export const useUserData = () => {
	const currentConvexUser = useConvexQuery(api.auth.user.current);

	return {
		currentConvexUser,
	};
}; 