import type { FC } from 'react';
import { useState, useEffect } from 'react';
import type { IAddOrEditTodo } from '@/interface/todo';
import checkIcon from '@/assets/font/check.svg';
import closeIcon from '@/assets/font/close.svg';

const App: FC<{
	onClose: () => void;
	onAdd: (data: IAddOrEditTodo) => void;
}> = ({ onClose, onAdd }) => {
	const [tags] = useState(() => {
		const arr = [];
		const len = 4;
		for (let i = 0; i < len; i++) {
			arr.push({
				id: i + 1,
				name: (i + 1).toString(),
			});
		}
		return arr;
	});
	const [dataForm, setDataForm] = useState<IAddOrEditTodo>({
		title: '',
		content: '',
		tagName: '',
		level: 1,
	});

	useEffect(() => {
		window.document.body.style.overflow = 'hidden';
		return () => {
			window.document.body.style.overflow = 'auto';
		};
	}, []);

	const changeFieldVal = (key: string, val: unknown) => {
		setDataForm((prev) => ({ ...prev, [key]: val }));
	};

	const addTodo = () => {
		for (const key in dataForm) {
			const val = dataForm[key as keyof IAddOrEditTodo];
			if (val === '' || val === undefined || val === null) {
				window.alert(`${key} is required`);
				return;
			}
		}
		onAdd(dataForm);
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 z-20 bg-gray-50 bg-opacity-90">
			<div
				className="absolute left-[50%] -translate-x-[50%] bottom-[4.79%]"
				style={{ width: 455 }}
			>
				<div className="flex flex-col gap-6 rounded-lg bg-white p-10 shadow-sm">
					<input
						placeholder="Take dog out on walk"
						className="font-inter h-11 rounded border border-gray-200 pl-4 text-base leading-4 text-gray-600"
						value={dataForm.title}
						onChange={(e) => changeFieldVal('title', e.target.value)}
					/>
					<textarea
						placeholder="He needs vaccine shot too"
						className="font-inter min-h-[70px] rounded border border-gray-200 p-4 text-base leading-4 text-gray-600"
						value={dataForm.content}
						onChange={(e) => changeFieldVal('content', e.target.value)}
					/>
					<input
						placeholder="Tags"
						className="font-inter h-11 rounded border border-gray-200 pl-4 text-base leading-4 text-gray-600"
						value={dataForm.tagName}
						onChange={(e) => changeFieldVal('tagName', e.target.value)}
					/>
					<div className="flex items-center gap-4">
						{tags.map((item) => (
							<span
								key={item.id}
								className={`font-inter cursor-pointer rounded border text-base font-medium leading-5 ${
									dataForm.level === item.id
										? 'border-blue-500 text-blue-500'
										: 'border-gray-200 text-gray-500'
								}`}
								style={{ padding: '7px 14px' }}
								onClick={() => {
									changeFieldVal('level', item.id);
								}}
							>
								{item.name}
							</span>
						))}
					</div>
				</div>
				<div className="mt-8 flex items-center justify-center gap-4">
					<img
						src={closeIcon}
						className="h-9 w-9 cursor-pointer"
						onClick={onClose}
					/>
					<img
						src={checkIcon}
						className="h-9 w-9 cursor-pointer"
						onClick={addTodo}
					/>
				</div>
			</div>
		</div>
	);
};

export default App;
