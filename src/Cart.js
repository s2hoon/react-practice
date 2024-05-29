import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge, addCount } from "./store";
function Cart() {
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch();
  console.log(state);
  return (
    <div>
      {state.user.name}
      {state.user.age} 의 장바구니
      <button
        onClick={() => {
          dispatch(changeAge());
        }}
      >
        버튼
      </button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.thing.map((a, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{state.thing[i].name}</td>
              <td>{state.thing[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(addCount(i));
                  }}
                >
                  {" "}
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
