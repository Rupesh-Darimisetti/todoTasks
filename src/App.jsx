import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import './todoitems.css';

function App() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('');
  const [toggle, setToggle] = useState(false);

  const toggleChange = (task) => {
    setToggle(!task.isToggle)
  }

  const addTasks = (event) => {
    event.preventDefault()
    let todoItem = {
      id: uuid(),
      item: task,
      isToggle: toggle
    }
    tasks.push(todoItem)
    setTasks(tasks)
    setToggle(todoItem.isToggle)
    setTask('')
    localStorage.setItem('todos', JSON.stringify(tasks))
  };
  const deleteTask = id => {
    console.log(tasks)
    console.log(id)
    setTasks(tasks.filter(ele => id !== ele.id))
    localStorage.removeItem('todos', tasks.id)
    localStorage.getItem('todos')
  };

  const onChangeTodo = (event) => {
    event.preventDefault()
    let value = event.target.value
    setTask(value.trim().length > 0 && value)
    localStorage.setItem('todos', JSON.stringify({ ...tasks, task }))
  }
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('todos'))
    // localStorage.setItem('todos', JSON.stringify(tasks))
    if (tasks) {
      setTasks(tasks)
    }
  }, [])
  return (
    <>
      <h1>Task Tracker</h1>
      <form onSubmit={addTasks}>
        <input type="text" value={task} onChange={onChangeTodo} placeholder='todo task' />
        <button onClick={addTasks}>Add Task</button>
      </form>
      {/* <TodoItems todoElements={tasks} onDeleteITem={deleteTask} /> */}
      {tasks.map(data => (
        <div className={toggle ? 'todo:checked' : 'todo'} key={data?.id}>
          <input type='checkbox' value={data?.id} id={data?.id} onToggle={() => toggleChange(item)} />
          <label htmlFor={data?.id}>{data?.item}</label>
          <button onClick={() => deleteTask(data.id)}>delete</button>
        </div>
      ))}
    </>
  )
}

export default App
