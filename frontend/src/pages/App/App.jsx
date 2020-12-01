import './style.css'

export default function App() {
  const handleAddNewCase = (e) => {}

  return (
    <div className="app">
      <div className="header">
        <h1 className="title">VistaPath Cases</h1>
        <button
          className="button is-primary is-small"
          onClick={handleAddNewCase}
        >
          Add New Case
        </button>
      </div>
    </div>
  )
}
