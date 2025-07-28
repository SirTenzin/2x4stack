import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Id } from "@2x4/backend/convex/_generated/dataModel";

interface NumberData {
	_id: Id<"numbers">;
	value: number;
}

interface NumbersSectionProps {
	data?: {
		numbers: NumberData[];
	};
	onDeleteNumber: (id: Id<"numbers">) => void;
}

export const NumbersSection = ({ data, onDeleteNumber }: NumbersSectionProps) => {
	return (
		<AccordionItem value="random-numbers" className="bg-white border border-slate-200 shadow-sm rounded-lg overflow-hidden">
			<AccordionTrigger className="text-xl font-semibold px-8 py-6 hover:bg-slate-50 transition-all duration-200">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 bg-slate-900 rounded-full"></div>
					Random Numbers
				</div>
			</AccordionTrigger>
			<AccordionContent className="px-8 pb-8 pt-5">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 select-none">
					{data?.numbers.map((number) => (
						<div
							key={number._id}
							className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 text-center cursor-pointer hover:border-slate-300 group"
							onClick={() => onDeleteNumber(number._id)}
						>
							<span className="text-2xl font-bold text-slate-900 group-hover:text-slate-700 transition-all duration-200">
								{number.value}
							</span>
							<div className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								Click to delete
							</div>
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}; 