import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import UpdateProfilePage from './pages/UpdateProfilePage'
import SearchPage from './pages/SearchPage'
import Followers from './pages/Followers'
import Following from './pages/Following'

function App() {
  const user = useRecoilValue(userAtom)
  const{pathname} = useLocation();


  return (
    <Container maxW={pathname==="/"?"900px":"780px"}>
      <Header />
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
        <Route path='/:username' element={user ?<UserPage />: <Navigate to="/auth" />} />
        <Route path='/:username/post/:postId' element={user ? <PostPage /> : <Navigate to="/auth" />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to="/auth" />} />
        <Route path='/:userId/followers' element={user ? <Followers /> : <Navigate to="/auth" />} />
        <Route path='/:userId/following' element={user ? <Following /> : <Navigate to="/auth" />} />
      </Routes>
    </Container>

  )
}

export default App