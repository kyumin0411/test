const TodoComponent = ({ data, index, onEdit, onDelete }) => {
  return (
    <div className='box'>
      <input
        name='isCheck'
        type='checkbox'
        className='box__checkbox'
        checked={data.isCheck}
        onChange={(e) => {
          onEdit(e, index, true);
        }}
      />
      {data.isEdit ? (
        <input
          name='title'
          value={data.title}
          onChange={(e) => {
            onEdit(e, index);
          }}
        />
      ) : (
        <div className='box__text'>{data.title}</div>
      )}
      <button
        onClick={() =>
          onEdit({ target: { name: 'isEdit', value: !data.isEdit } }, index)
        }
      >
        toggle
      </button>
      <button onClick={() => onDelete(index)}>삭제</button>
    </div>
  );
};

export default TodoComponent;
