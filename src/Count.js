import { useState } from 'react';

function Counter() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState({
    input: '',
  });

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
          <div className='box'>
            <input
              type='checkbox'
              className='box__checkbox'
              checked={value.isCheck}
              onChange={(e) => {
                setData(
                  data.map((_value, _index) => {
                    if (index === _index) {
                      return { ..._value, isCheck: e.target.checked };
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
                      return { ..._value, isEdit: !_value.isEdit };
                    }
                    return _value;
                  })
                )
              }
            >
              toggle
            </button>
            <button
              onClick={() =>
                setData(
                  data.filter((_value, _index) =>
                    index === _index ? false : true
                  )
                )
              }
            >
              삭제
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Counter;
