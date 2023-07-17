import './App.less';
import { useState, useEffect } from 'react';
import type { ITodoItem, IAddOrEditTodo } from '@/interface/todo';
import plusIcon from '@/assets/font/plus.svg';
import CardInputDialg from '@/components/CardInputDialog';
import CardItem from '@/components/CardItem';

const App: React.FC = () => {
	const [todoList, setTodoList] = useState<ITodoItem[]>([]);
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [showStateBtn, setShowStateBtn] = useState<boolean>(false);

	useEffect(() => {
		function initModel() {
			const cache = localStorage.getItem('todoList');
			const store = cache ? (JSON.parse(cache) as ITodoItem[]) : null;
			if (store) {
				setTodoList(store);
			} else {
				const arr = [];
				const item: Omit<ITodoItem, 'id'> = {
					title: 'Lorem ipsum dolor',
					content:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
					tags: [
						{
							id: 1,
							level: 1,
							name: 'P1',
						},
						{
							id: 2,
							level: 2,
							name: 'Health',
						},
					],
				};
				for (let i = 10; i > 0; i--) {
					const newItem = JSON.parse(JSON.stringify(item)) as ITodoItem;
					arr.push({
						...newItem,
						id: i,
					});
				}
				setTodoList(arr);
			}
		}
		initModel();
	}, []);

	const addTodoHandler = (data: IAddOrEditTodo) => {
		setTodoList((prev) => {
			const newData: ITodoItem = {
				id: prev.length,
				title: data.title,
				content: data.content,
				tags: [{ id: 1, level: data.level, name: data.tagName }],
			};
			const arr = [newData, ...prev];
			localStorage.setItem('todoList', JSON.stringify(arr));
			return arr;
		});
		setShowDialog(false);

		setTimeout(() => {
			window.scrollTo({ top: 0 });
		}, 100);
	};

	return (
		<>
			<div className="todo-wrap h-screen w-screen bg-gray-50">
				<div className="bg-gray-50">
					<div
						className="mx-auto flex flex-col gap-8"
						style={{ width: 445, paddingBottom: 224 }}
					>
						<div className="mt-9">
							<h1 className="font-inter text-center text-7xl font-black leading-tight text-gray-300">
								Daily Todo
							</h1>
						</div>
						{todoList.map((item) => {
							return (
								<CardItem
									key={item.id}
									data={item}
									onShowStateBtn={setShowStateBtn}
								/>
							);
						})}
					</div>
				</div>
				<div
					className="fixed left-[50%] z-10 -translate-x-[50%]"
					style={{ bottom: '4.79%' }}
				>
					<div className="flex items-center gap-4">
						<img
							src={plusIcon}
							onClick={() => setShowDialog(true)}
							className="h-9 w-9 cursor-pointer"
						/>
					</div>
				</div>
				<div
					className={`fixed left-[8.54%] top-[50%] z-10 -translate-y-[50%] transition-opacity duration-100 ${
						showStateBtn ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<svg
						width="129"
						viewBox="0 0 142 165"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="del-btn cursor-pointer"
					>
						<path
							d="M92.0883 58.8791L89.378 129.379M51.872 129.379L49.1617 58.8791M127.244 33.7341C129.923 34.1414 132.587 34.5722 135.25 35.0344M127.244 33.7419L118.878 142.484C118.537 146.912 116.537 151.047 113.278 154.064C110.019 157.08 105.741 158.755 101.3 158.754H39.9497C35.5089 158.755 31.2313 157.08 27.9723 154.064C24.7133 151.047 22.7131 146.912 22.3717 142.484L14.0057 33.7341M127.244 33.7341C118.204 32.3673 109.116 31.33 100 30.6242M6 35.0266C8.66333 34.5644 11.3267 34.1336 14.0057 33.7341M14.0057 33.7341C23.0464 32.3673 32.1338 31.33 41.25 30.6242M100 30.6242V23.4489C100 14.2056 92.8717 6.49758 83.6283 6.20775C74.9617 5.93075 66.2883 5.93075 57.6217 6.20775C48.3783 6.49758 41.25 14.2134 41.25 23.4489V30.6242M100 30.6242C80.4458 29.113 60.8042 29.113 41.25 30.6242"
							stroke="#F3F4F6"
							strokeWidth="11.75"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="transition duration-100 ease-in-out"
						/>
					</svg>
				</div>
				<div
					className={`op-btn fixed right-[8.54%] top-[50%] z-10 -translate-y-[50%] transition-opacity duration-100 ${
						showStateBtn ? 'opacity-100' : 'opacity-0'
					}`}
					style={{ display: showStateBtn ? undefined : 'none' }}
				>
					<svg
						width="129"
						height="129"
						viewBox="0 0 153 153"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="cursor-pointer transition duration-100 ease-in-out hover:fill-slate-100"
					>
						<path
							d="M53 82.375L70.625 100L100 58.875M147 76.5C147 85.7582 145.176 94.9257 141.634 103.479C138.091 112.033 132.898 119.804 126.351 126.351C119.804 132.898 112.033 138.091 103.479 141.634C94.9257 145.176 85.7582 147 76.5 147C67.2418 147 58.0743 145.176 49.5208 141.634C40.9674 138.091 33.1955 132.898 26.649 126.351C20.1024 119.804 14.9094 112.033 11.3665 103.479C7.82354 94.9257 6 85.7582 6 76.5C6 57.8022 13.4277 39.8703 26.649 26.649C39.8703 13.4277 57.8022 6 76.5 6C95.1978 6 113.13 13.4277 126.351 26.649C139.572 39.8703 147 57.8022 147 76.5Z"
							stroke="#F1F5F9"
							strokeWidth="11.75"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
			{showDialog && (
				<CardInputDialg
					onClose={() => setShowDialog(false)}
					onAdd={addTodoHandler}
				/>
			)}
		</>
	);
};

export default App;
