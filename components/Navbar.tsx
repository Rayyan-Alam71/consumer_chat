'use client'
import { LogOutIcon } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {

    const session = useSession()

    return (
        <div className='w-full px-16 py-6 bg-amber-100'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* left logo */}
                <h2 className='text-xl md:text-2xl lg:text-3xl   font-bold'>HelpBot</h2>
                {/* right side => signIN / signOut */}

                {!session.data?.user && <Button onClick={()=>signIn()}>Sign In</Button>}
                {session.data?.user && <Button className='cursor-pointer' variant={"default"}>{session.data.user.name?.charAt(0).toUpperCase() + session.data.user.name?.slice(1)!} <LogOutIcon/></Button>}
            </div>
        </div>
    )
}

export default Navbar
