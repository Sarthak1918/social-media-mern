import React, { useEffect } from 'react'
import { Button, Center, Container, Flex } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './pages/UserPage'
import PostPage from './pages/PostPage'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from './atoms/userAtom'
import LogoutBtn from './components/LogoutBtn'
import UpdateProfilePage from './pages/UpdateProfilePage'
import CreatePost from './components/CreatePost'

function App() {
  const user = useRecoilValue(userAtom)
  // const setUserAtomState = useSetRecoilState(userAtom)

  
  return (
      <Container maxW={"750px"}>
        <Header />
        <Routes>
          <Route path='/' element={user?<HomePage />:<Navigate to="/auth"/>} />
          <Route path='/auth' element={!user ? <AuthPage />:<Navigate to="/"/>} />
          <Route path='/update' element={user ? <UpdateProfilePage />:<Navigate to="/auth"/>} />
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
        </Routes>
        {user&&<CreatePost/>}
      </Container>

  )
}

export default App