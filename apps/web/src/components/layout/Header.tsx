interface HeaderProps {
	title: string;
	description: string;
}

export const Header = ({ title, description }: HeaderProps) => {
	return (
		<div className="text-center mb-12">
			<h1 className="text-5xl font-bold text-slate-900 mb-4">
				{title}
			</h1>
			<p className="text-slate-600 text-lg max-w-2xl mx-auto">
				{description}
			</p>
		</div>
	);
}; 