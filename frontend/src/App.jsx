import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard"
import LearnerList from "./components/LearnerList"
import CreateLearner from "./components/CreateLearner"
import LearnerModalWrapper from "./components/LearnerModalWrapper"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="list" element={<LearnerList />}>
    <Route path=":id" element={<LearnerModalWrapper />} />
  </Route>
          <Route path="create" element={<CreateLearner />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App