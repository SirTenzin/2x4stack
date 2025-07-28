import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import { useRandomNumbers } from "@/components/hooks/useRandomNumbers";
import { Accordion } from "@/components/ui/accordion";
import { Header } from "@/components/layout/Header";
import { ActionButtons } from "@/components/ui/ActionButtons";
import { UserWelcome } from "@/components/ui/UserWelcome";
import { NumbersSection } from "@/components/layout/sections/NumbersSection";
import { AutumnSection } from "@/components/layout/sections/AutumnSection";
import { ConvexUserSection } from "@/components/layout/sections/ConvexUserSection";
import { useCustomer } from "autumn-js/react";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const { customer, isLoading: isCustomerLoading, checkout } = useCustomer();

	// Implement upgrade logic using autumn-js checkout
	const handleUpgrade = async () => {
    if(isCustomerLoading || !customer) return;
		try {
			console.log("Upgrade needed - starting checkout for paid product");
			await checkout({ 
				productId: "paid",
				successUrl: window.location.href
			});
		} catch (error) {
			console.error("Failed to start checkout:", error);
		}
	};

	const {
		data,
		isPending,
		deleteById,
		handleGenerateRandom,
		currentConvexUser,
		login,
		register,
		isAuthenticated,
		isLoading,
		user,
		logout,
	} = useRandomNumbers({ handleUpgrade });

	return (
		<div className="min-h-screen bg-slate-50 p-6">
			<div className="max-w-6xl mx-auto">
				<Header 
					title="Random Numbers"
					description="Professional random number generation and data management platform"
				/>

				<ActionButtons
					isPending={isPending}
					handleGenerateRandom={handleGenerateRandom}
					onIdentifyUser={() => console.log(currentConvexUser)}
					isAuthenticated={isAuthenticated}
					isLoading={isLoading}
					onLogin={() => login({ redirectURL: "http://localhost:3000/" })}
					onRegister={() => register({ redirectURL: "http://localhost:3000/" })}
				/>

				<UserWelcome 
					user={user}
					onLogout={logout}
				/>

				{/* Main Content */}
				<div className="space-y-6">
					<Accordion type="single" className="w-full space-y-4" collapsible>
						<NumbersSection 
							data={data}
							onDeleteNumber={(id) => deleteById({ id })}
						/>

						<AutumnSection 
							currentConvexUser={currentConvexUser}
						/>

						<ConvexUserSection 
							currentConvexUser={currentConvexUser}
						/>
					</Accordion>
				</div>
			</div>
		</div>
	);
}
