import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage'
import GamePage from './pages/GamePage'
import SuccessPage from './pages/SuccessPage'
import FailPage from './pages/FailPage'
import FinalPage from './pages/FinalPage'

const router = createBrowserRouter([
    { path: '/', element: <MainPage /> },
    { path: '/game', element: <GamePage /> },
    { path: '/success', element: <SuccessPage /> },
    { path: '/fail', element: <FailPage /> },
    { path: '/final', element: <FinalPage /> },
])

function App() {
    return <RouterProvider router={router} />
}

export default App