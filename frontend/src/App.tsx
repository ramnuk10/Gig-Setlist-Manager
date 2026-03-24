import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SetlistsPage from './pages/SetlistsPage'
import SetlistDetailPage from './pages/SetlistDetailPage'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🎸 Gig Setlist Manager</h1>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<SetlistsPage />} />
            <Route path="/setlist/:id" element={<SetlistDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
