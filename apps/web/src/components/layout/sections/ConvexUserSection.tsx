import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ConvexUserSectionProps {
	currentConvexUser: any;
}

export const ConvexUserSection = ({ currentConvexUser }: ConvexUserSectionProps) => {
	return (
		<AccordionItem value="convex-auth-data" className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
			<AccordionTrigger className="text-xl font-semibold px-8 py-6 hover:bg-slate-50 transition-all duration-200">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 bg-slate-900 rounded-full"></div>
					Convex Auth Data
				</div>
			</AccordionTrigger>
			<AccordionContent className="px-8 pb-8 pt-5">
				{currentConvexUser != null && (
					<Card className="bg-white border border-slate-200 shadow-sm rounded-lg">
						<CardHeader>
							<CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
								<div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
									<span className="text-white text-sm font-medium">👤</span>
								</div>
								User Information
							</CardTitle>
							<CardDescription className="text-slate-600">
								Current authenticated user details
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-3">
									<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
										<span className="text-sm font-medium text-slate-500 w-20">Email:</span>
										<span className="text-sm text-slate-900 font-medium">{currentConvexUser.email}</span>
									</div>
									<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
										<span className="text-sm font-medium text-slate-500 w-20">First:</span>
										<span className="text-sm text-slate-900 font-medium">{currentConvexUser.firstName}</span>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
										<span className="text-sm font-medium text-slate-500 w-20">Last:</span>
										<span className="text-sm text-slate-900 font-medium">{currentConvexUser.lastName}</span>
									</div>
									<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
										<span className="text-sm font-medium text-slate-500 w-20">Orgs:</span>
										<span className="text-sm text-slate-900 font-medium">
											{currentConvexUser.organizations?.map((org: any) => org.code).join(", ") || "None"}
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				)}
			</AccordionContent>
		</AccordionItem>
	);
}; 