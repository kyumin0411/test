import { useState } from 'react';
import TodoComponent from './TodoComponent';

function Counter() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    input: '',
  });

  const onEdit = (e, index, isCheck = false) => {
    setData(
      data.map((_value, _index) => {
        if (index === _index) {
          return {
            ..._value,
            [e.target.name]: isCheck ? e.target.checked : e.target.value,
          };
        }
        return _value;
      })
    );
  };

  const onDelete = (index) => {
    setData(data.filter((_value, _index) => (index === _index ? false : true)));
  };

  return (
    <>
      <input
        name='input'
        value={input.input}
        onChange={function (e) {
          setInput({ ...input, [e.target.name]: e.target.value });
        }}
      />
      <button
        onClick={() => {
          setData(
            data.concat({ title: input.input, isCheck: false, isEdit: false })
          );
        }}
      >
        추가
      </button>
      {data.map(function (value, index) {
        return (
          <TodoComponent
            key={index}
            data={value}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
}

export default Counter;
