import Logoutbtn from '@/app/_Component/Button/Logoutbtn'
import { Flex } from 'antd'
import React from 'react'

export default function page() {
  return (
    <div>
      <Flex justify='center' align='center' className='h-screen' vertical>
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>...Home Page...</h1>
        <Logoutbtn />
      </Flex>
    </div>
  )
}
