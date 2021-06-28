import { useState } from 'react';
import TodoList_component from './TodoList_component';
import DoneList_component from './DoneList_component';

function TodoList() {
	const [input, setInput] = useState({ input: '' });
	const [data, setData] = useState([]);

	function onEdit(e, index, isCheck = false) {
		setData(
			data.map((_value, _index) => {
				if (index === _index) {
					return {
						..._value,
						[e.target.name]: isCheck ? !_value.isCheck : e.target.value,
					};
				} else return _value;
			})
		);
	}

	function onDelete(index) {
		return setData(data.filter((_value, _index) => (index === _index ? false : true)));
	}

	return (
		<div>
			<h1>What is your task?</h1>
			<br />
			<div id='input'>
				<input
					className='input_box'
					type='text'
					name='input'
					value={input.input}
					onChange={(e) => {
						setInput({ ...input, [e.target.name]: e.target.value });
					}}
				/>
				<button
					onClick={() => {
						setData(data.concat({ title: input.input, isCheck: false, isEdit: false }));
						setInput({ input: '' });
					}}
				>
					추가
				</button>
			</div>

			<div className='container'>
				<div className='container_item'>
					<h2>---TO DO LIST---</h2>
					{data.map((value, index) => {
						if (value.isCheck) {
							return null;
						}
						return (
							<TodoList_component
								key={index}
								_value={value}
								index={index}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						);
					})}
				</div>
				<div className='container_item'>
					<h2>---DONE LIST---</h2>
					{data.map((value, index) => {
						if (value.isCheck)
							return (
								<DoneList_component
									key={index}
									_value={value}
									index={index}
									onDelete={onDelete}
									onEdit={onEdit}
								/>
							);
						else return null;
					})}
				</div>
			</div>
		</div>
	);
}

export default TodoList;
