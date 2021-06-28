import { useState } from 'react';

function Counter() {
	const [input, setInput] = useState({ input: '' });
	const [data, setData] = useState([]);

	console.log(input.input);
	console.log(data);
	return (
		<div>
			<input
				name='input'
				value={input.input}
				className='input_box'
				type='text'
				onChange={(e) => {
					setInput({ ...input, [e.target.name]: e.target.value });
				}}
			/>
			<button
				onClick={() => {
					setData(data.concat({ title: input.input, isCheck: false, isEdit: false }));
				}}
			>
				추가
			</button>
			{data.map((value, index) => {
				return (
					<div className='box'>
						<input
							type='checkbox'
							className='box__checkbox'
							checked={value.isCheck}
							onChange={(e) => {
								setData(
									data.map((_value, _index) => {
										if (index === _index) {
											return { ...value, isCheck: e.target.checked };
										}
										return _value;
									})
								);
							}}
						/>
						<div className='box__text'>{value.title}</div>
						<button
							onClick={() =>
								setData(
									data.map((_value, _index) => {
										if (index === _index) {
											return { ...value, isEdit: !_value.isEdit };
										}
										return _value;
									})
								)
							}
						>
							toggle
						</button>
						<button
							onClick={() => {
								setData(data.filter((_value, _index) => (index === _index ? false : true)));
							}}
						>
							삭제
						</button>
					</div>
				);
			})}
		</div>
	);
}

export default Counter;
