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

function App() {
  const user = useRecoilValue(userAtom)
  // const setUserAtomState = useSetRecoilState(userAtom)

  
  return (
      <Container maxW={"620px"}>
        <Header />
        <Routes>
          <Route path='/' element={user?<HomePage />:<Navigate to="/auth"/>} />
          <Route path='/auth' element={!user ? <AuthPage />:<Navigate to="/"/>} />
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
        </Routes>
        {user&&<LogoutBtn/>}
      </Container>

  )
}

export default App