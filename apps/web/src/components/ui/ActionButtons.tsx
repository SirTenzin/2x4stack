import { Button } from "./button";

interface ActionButtonsProps {
	isPending: boolean;
	handleGenerateRandom: () => void;
	onIdentifyUser: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
	onLogin: () => void;
	onRegister: () => void;
}

export const ActionButtons = ({
	isPending,
	handleGenerateRandom,
	onIdentifyUser,
	isAuthenticated,
	isLoading,
	onLogin,
	onRegister,
}: ActionButtonsProps) => {
	return (
		<div className="flex flex-wrap justify-center mb-12 gap-4">
			<Button
				disabled={isPending}
				onClick={handleGenerateRandom}
				className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
			>
				{isPending ? "Generating..." : "Generate Random Numbers"}
			</Button>
			<Button
				variant="outline"
				onClick={onIdentifyUser}
				className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-medium py-3 px-6 rounded-lg transition-all duration-200"
			>
				Identify User
			</Button>
			{!isAuthenticated && !isLoading && (
				<>
					<Button
						variant="outline"
						onClick={onLogin}
						className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-medium py-3 px-6 rounded-lg transition-all duration-200"
					>
						Sign In
					</Button>
					<Button
						onClick={onRegister}
						className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
					>
						Sign Up
					</Button>
				</>
			)}
		</div>
	);
}; 