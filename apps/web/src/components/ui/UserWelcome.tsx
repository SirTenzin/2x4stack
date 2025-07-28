import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

interface UserWelcomeProps {
	user: any;
	onLogout: () => void;
}

export const UserWelcome = ({ user, onLogout }: UserWelcomeProps) => {
	if (!user) return null;

	return (
		<Card className="mb-12 max-w-md mx-auto bg-white border border-slate-200 shadow-sm rounded-lg">
			<CardHeader className="text-center pb-4">
				<div className="w-16 h-16 bg-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center">
					<span className="text-white font-medium text-xl">
						{user.givenName?.[0] ?? "U"}
					</span>
				</div>
				<CardTitle className="text-xl font-semibold text-slate-900">
					Welcome back!
				</CardTitle>
				<CardDescription className="text-slate-600">
					{user.givenName ?? "Unknown"} {user.familyName ?? ""} • {user.email}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex justify-center pb-6">
				<Button
					variant="outline"
					onClick={onLogout}
					className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 font-medium py-2 px-6 rounded-lg transition-all duration-200"
				>
					Sign out
				</Button>
			</CardContent>
		</Card>
	);
}; 