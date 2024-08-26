import './App.css';
import StudentsList from './components/StudentsList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentForm from './components/CreateStudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentsList />} />
        <Route path="/students/:id/edit" element={<StudentForm />} />
        <Route path="/students/new" element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
