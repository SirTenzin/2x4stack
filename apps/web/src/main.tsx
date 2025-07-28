import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
	RouterProvider,
	createRouter as createTanStackRouter,
} from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";
import { ConvexQueryClient } from "@convex-dev/react-query";
import { CatchBoundary } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { QueryClient } from "@tanstack/react-query";
import { KindeProvider, useKindeAuth } from "@kinde-oss/kinde-auth-react";
import ConvexAuthProvider from "./components/providers/ConvexKinde.provider.tsx";
import { AutumnProvider } from "autumn-js/react";

// Custom Autumn Provider that includes auth
function AuthenticatedAutumnProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { getToken } = useKindeAuth();
	const getBearerToken = async () => {
		const token = await getToken(); 
		return token || null;
	};
	return (
		<AutumnProvider
			backendUrl={import.meta.env.VITE_AUTUMN_BACKEND_URL as string}
			includeCredentials={true}
			getBearerToken={getBearerToken}
		>
			{children}
		</AutumnProvider>
	);
}

export function createRouter() {
	const CONVEX_URL = (import.meta as any).env.VITE_CONVEX_URL!;
	if (!CONVEX_URL) {
		console.error("missing envar VITE_CONVEX_URL");
	}
	const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				queryKeyHashFn: convexQueryClient.hashFn(),
				queryFn: convexQueryClient.queryFn(),
			},
		},
	});
	convexQueryClient.connect(queryClient);

	const router = routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			defaultPreload: "intent",
			context: { queryClient },
			Wrap: ({ children }) => (
				<KindeProvider
					domain={import.meta.env.VITE_KINDE_DOMAIN as string}
					clientId={import.meta.env.VITE_KINDE_CLIENT_ID as string}
					redirectUri={
						import.meta.env.VITE_KINDE_REDIRECT_URL as string
					}
					audience="convex"
				>
					<CatchBoundary
						errorComponent={(e: any) => (
							<div>Error: {JSON.stringify(e)}</div>
						)}
						getResetKey={() => "error"}
					>
						<ConvexAuthProvider>
							<AuthenticatedAutumnProvider>
								{children}
							</AuthenticatedAutumnProvider>
						</ConvexAuthProvider>
					</CatchBoundary>
				</KindeProvider>
			),
		}),
		queryClient
	);

	return router;
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={createRouter()} />
		</StrictMode>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
