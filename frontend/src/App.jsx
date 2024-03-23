import { Container } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import UpdateProfilePage from './pages/UpdateProfilePage'
import postsAtom from './atoms/postsAtom'
import SearchPage from './pages/SearchPage'

function App() {
  const user = useRecoilValue(userAtom)
  const posts= useRecoilValue(postsAtom);



  return (
    <Container maxW={"780px"}>
      <Header />
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path='/auth' element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/update' element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />} />
        <Route path='/:username' element={user ?<UserPage />: <Navigate to="/auth" />} />
        <Route path='/:username/post/:postId' element={user ? <PostPage /> : <Navigate to="/auth" />} />
        <Route path='/search' element={user ? <SearchPage /> : <Navigate to="/auth" />} />
      </Routes>
    </Container>

  )
}

export default App