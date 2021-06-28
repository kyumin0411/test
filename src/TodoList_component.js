const TodoList_component = ({ _value, index, onDelete, onEdit }) => {
	return (
		<div className='box'>
			{/* check box */}
			<input
				type='checkbox'
				className='box__checkbox'
				name='isCheck'
				onClick={(e) => {
					onEdit(e, index, true);
				}}
			/>

			{/* showing title or input box */}
			{_value.isEdit ? (
				<input
					type='text'
					value={_value.title}
					name='title'
					onChange={(e) => {
						onEdit(e, index);
					}}
				/>
			) : (
				<div className='box__text'> {_value.title} </div>
			)}

			{/* 수정 button, 삭제 button */}
			<button
				onClick={() => {
					onEdit({ target: { name: 'isEdit', value: !_value.isEdit } }, index);
				}}
			>
				수정
			</button>
			<button
				onClick={() => {
					onDelete(index);
				}}
			>
				삭제
			</button>
		</div>
	);
};

export default TodoList_component;
