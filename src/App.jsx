import { useEffect, useState } from 'react'
import TodoList from './components/TodoList.jsx'
import TodoInput from './components/TodoInput.jsx';
import './App.css'

// 로컬스토리지란
// 웹 브라우저에 데이터를 저장하는 공간
// 브라우저를 닫아도 데이터를 유지
// 용량 제한 있음

function App() {
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {

    // localStorage에 'todos'라는 이름으로 저장된게 있는지 확인
    const saved = localStorage.getItem('todos');
    if (saved) {

      // JSON 문자열을 다시 객체 또는 배열로 변환해서 반환
      return JSON.parse(saved)
    }

    // 없으면 빈 배열 반환
    return []
  });

  useEffect(() => {
    // 원래 배열/객체를 문자열로 바꿔서 저장
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  // todos에 변화가 생길때만 useEffect가 실행되게함


  function addTodo(newTodo) {
    setTodos([
      ...todos,
      {
        // UUID: 겹치지 않는 고유한 ID, 즉 번호를 만들때 사용.
        id: crypto.randomUUID(), // 'aw39awj-k23i2-19rjria12-1o21j'
        text: newTodo,
        done: false,
        isEditing: false
      }
    ]);
    // 새 항목 추가 시 완료상태는 false(미완료)
    // newTodo는 위치지정용. newText의 위치를 지정해주려고 적은 매개변수.
  }

  // 수정모드 전환 함수(수정 버튼 클릭 시)
  function toggleEdit(id) {
    const editTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: !item.isEditing }
      }
      return item;
    });

    setTodos(editTodos)
  }

  // 수정 완료 함수 (저장 버튼 클릭 시)
  function updateTodo(id, newText) {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text: newText,
          isEditing: false
          // 텍스트를 변경+ isEditing false로 변경
        }
      }
      return item;
    })
    setTodos(updateTodos)
  }


  // 할일 완료 상태(체크박스)
  function toggleTodo(id) {
    const newTodos = todos.map((item) => {
      if (item.id === id) { //해당 index가 내가 클릭한 index라면
        return { ...item, done: !item.done } // 원래 내용은 그대로 두고 done 속성만 반대로 바꿔줌
      }
      return item;
    });

    setTodos(newTodos) // 새 배열로 상태 업데이트
  }


  // // 할 일 삭제 함수
  // function deleteTodo(deleteIndex) {
  //   const newTodos = [...todos] // 기존의 배열을 그대로 복사
  //   newTodos.splice(deleteIndex, 1) // 클릭한 deleteIndex를 1개 삭제
  //   setTodos(newTodos) // 새 배열로 상태 업데이트
  // }// 근데 splice는 선호되지않음. 아래에 다른방식을 알려주겠음

  // filter 함수로 변경
  // filter: 배열을 하나씩 훑으면서 조건에 맞는 것만 새 배열로 변환
  function deleteTodo(id) {
    // const newTodos = todos.filter((item, index) => index !== deleteIndex);
    // setTodos(newTodos)

    // 한줄로 쓰면
    // setTodos(todos.filter((item, index)) => index !== deleteIndex));

    // index -> id로 변경하면 
    // 언더바 생략
    setTodos(todos.filter((item) => item.id !== id));
    // 이 자리에 값(item)이 있지만, 우리는 안쓸거예요 라는 뜻
    // 즉 값(item)은 필요없고, 위치(index)만 필요할 때
  }

  return (

    <div className='app'>
      <h1 className="title">Todo List</h1>

      <div className='contents'>
        {/* 인풋 추가  */}
        <TodoInput onAdd={addTodo} />
        {/* 뜻: TodoInput 컴포넌트는 onAdd라는 이름으로 addTodo값의 함수를 받는다. props는 부모가 자식에게 전달해주는것 (무조건) */}

        {/* 목록  */}
        <div >
          <TodoList todos={todos} Delete={deleteTodo} onToggle={toggleTodo} onEdit={toggleEdit} onUpdate={updateTodo} />
        </div>
      </div>
    </div>
  )
}

export default App