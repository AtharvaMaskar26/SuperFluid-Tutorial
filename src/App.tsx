// App.tsx
import './App.css'

// Importing components
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

function App() {
return (
    <div id='App'>
      <Navbar />
      <div className="flex justify-center mt-10">
        <Hero />
      </div>
    </div>
  )
}

export default App