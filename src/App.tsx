import { AppRouter } from './AppRouter'

function App() {
  const root = window.document.body
  console.log(root)
  root.classList.add('dark')
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
