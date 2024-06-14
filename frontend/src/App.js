import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div style={{ backgroundColor: '#1A237E', height: '100vh', width: '100vw' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskList />}/>
          <Route path="add-task" element={<TaskInput />} />
          <Route path="add-task/:id" element={<TaskInput />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;