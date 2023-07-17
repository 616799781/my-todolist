import type { FC } from 'react';
import type { ITodoItem } from '@/interface/todo';
import type { UnArray } from '@/interface/common';

const App: FC<{
	data: UnArray<ITodoItem>;
	onShowStateBtn: (val: boolean) => void;
}> = ({ data, onShowStateBtn }) => {
	const tagLevelClassMap: Record<string, string> = {
		1: 'bg-pink-100 text-rose-600',
		2: 'bg-green-50 text-green-600',
	};
	return (
		<div
			onMouseEnter={() => onShowStateBtn(true)}
			onMouseLeave={() => onShowStateBtn(false)}
			className="card-item flex flex-col items-start gap-3 rounded-lg bg-white p-6 shadow-sm transition-transform hover:scale-110"
		>
			<>
				<h1 className="font-inter text-xl font-black leading-7 text-gray-700">
					{data.title}
				</h1>
				<div className="truncate-2-lines font-inter text-sm font-medium leading-4 text-gray-500">
					{data.content}
				</div>
				{data.tags && (
					<div className="flex items-center gap-3">
						{data.tags.map((item) => {
							return (
								<span
									key={item.id}
									className={`font-inter rounded-xl px-2 py-1 text-xs font-semibold leading-4 ${
										tagLevelClassMap[item.level] || 'bg-gray-100 text-gray-500'
									}`}
								>
									{item.name}
								</span>
							);
						})}
					</div>
				)}
			</>
		</div>
	);
};

export default App;
