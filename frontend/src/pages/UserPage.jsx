import React from 'react'
import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'
import UserPost from '../components/UserPost'

function UserPage() {
  return (
    <div>
      <UserHeader/>
      <UserPost likes ={1889} replies={122} postImg = "post1.png" postTitle="Lets talk about Threds"/>
      <UserPost likes ={267} replies={12} postImg = "post2.png" postTitle="This is my first thread"/>
      <UserPost likes ={143} replies={45} postImg = "post3.png" postTitle="Hello People"/>
      <UserPost likes ={143} replies={45}  postTitle="Hello People"/>
    </div>
  )
}

export default UserPage