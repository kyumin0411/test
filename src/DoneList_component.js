const DoneList_component = ({ _value, index, onDelete, onEdit }) => {
	return (
		<div className='box'>
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
				<div className='box__texconst DoneList_component = ({ _value, index, onDelete, onEdit }) => {
					return (
						<div className='box'>
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
				
				export default DoneList_component;
				t'> {_value.title} </div>
			)}

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

export default DoneList_component;
