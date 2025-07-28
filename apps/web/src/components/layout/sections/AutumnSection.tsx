import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CustomerData } from "@/components/autumn/CustomerData";

interface AutumnSectionProps {
	currentConvexUser: any;
}

export const AutumnSection = ({ currentConvexUser }: AutumnSectionProps) => {
	return (
		<AccordionItem value="autumn-data" className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
			<AccordionTrigger className="text-xl font-semibold px-8 py-6 hover:bg-slate-50 transition-all duration-200">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 bg-slate-900 rounded-full"></div>
					Autumn Data
				</div>
			</AccordionTrigger>
			<AccordionContent className="px-8 pb-8 pt-5">
				{currentConvexUser != null && (
					<CustomerData user={currentConvexUser} />
				)}
			</AccordionContent>
		</AccordionItem>
	);
}; 