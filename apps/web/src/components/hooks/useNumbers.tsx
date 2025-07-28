import { useMutation } from "@tanstack/react-query";
import { useConvexAction, useConvexMutation, useConvexQuery } from "@convex-dev/react-query";
import { api } from "@2x4/backend/convex/_generated/api";

interface UseNumbersProps {
	handleUpgrade?: () => void;
}

interface GenerateResult {
	success: boolean;
	code?: string;
}

export const useNumbers = ({ handleUpgrade }: UseNumbersProps = {}) => {
	const data = useConvexQuery(api.tasks.listNumbers, { count: 100 });
	
	const { mutate: generateMutation, isPending } = useMutation({
		mutationFn: useConvexAction(api.tasks.generateRandomNumbers),
		onSuccess: (result: GenerateResult) => {
			if (result && !result.success && result.code === "not_allowed") {
				handleUpgrade?.();
			}
		},
		onError: (error) => {
			console.error("Failed to generate random numbers:", error);
		}
	});

	const { mutate: deleteById } = useMutation({
		mutationFn: useConvexMutation(api.tasks.deleteById),
	});

	const handleGenerateRandom = () => {
		return generateMutation({ count: 1 });
	};

	return {
		data,
		isPending,
		deleteById,
		handleGenerateRandom,
	};
}; 