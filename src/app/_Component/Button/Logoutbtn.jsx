'use client'
import React from 'react'
import { Button, Flex } from 'antd'
import { signOut, useSession } from 'next-auth/react'

export default function Logoutbtn() {
    const { data, status } = useSession()
    const handlelogout = () => signOut({ callbackUrl: '/login' })

    if (status === 'authenticated') {
        return (
            <Flex wrap gap="small" >
                <Button type="primary" danger block onClick={handlelogout}>
                    LogOut
                </Button>
            </Flex>
        )
    }
    return null;
}
