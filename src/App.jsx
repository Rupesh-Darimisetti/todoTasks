import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import './todoitems.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('');
  const [toggle, setToggle] = useState(false);
  const toggleChange = () => {
    setToggle(!tasks.toggle)
  }

  const addTasks = () => {
    let todoItem = {
      id: uuid(),
      item: task,
      isToggle: false
    }
    console.log(todoItem)
    // tasks.push(todoItem)
    setTasks([...tasks, todoItem])
    setTask('')
    localStorage.setItem('todos', JSON.stringify([...tasks]))
  };
  const deleteTask = id => setTasks(tasks.filter(ele => id != ele.id));

  const onChangeTodo = (event) => {
    event.preventDefault()
    setTask(event.target.value)
    localStorage.setItem('todos', JSON.stringify(...tasks))
  }
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks))
    localStorage.getItem('todos')
    if (tasks) {
      setTasks(tasks)
    }
  }, [tasks])
  return (
    <>
      <h1>Task Tracker</h1>
      <input type="text" value={task} onChange={onChangeTodo} placeholder='todo task' />
      <button onClick={addTasks}>Add Task</button>
      {/* <TodoItems todoElements={tasks} onDeleteITem={deleteTask} /> */}
      {tasks.map(data => (
        <div className='todo' key={data?.id}>
          <input type='checkbox' value={data?.id} id="item" onToggle={toggleChange} />
          <label className='todo:checked' htmlFor="item">{data?.item}</label>
          <button onSubmit={() => deleteTask(data?.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default App
