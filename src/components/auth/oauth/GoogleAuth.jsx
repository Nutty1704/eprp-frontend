import { cn } from '@/lib/utils'
import React from 'react'
import { googleAuth } from '@/src/lib/api/auth'

const GoogleAuth = ({ className, isOwner }) => {
  return (
    <button
      className={cn('flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-1.5 hover:border-gray-400', className)}
      onClick={() => googleAuth(isOwner ? 'owner' : 'customer')}
    >
        <img className='w-6 h-6' src="/icons/google.svg" alt="google" />
        <span className='text-sm 2xl:text-base inter-regular'>Sign in with Google</span>
    </button>
  )
}

export default GoogleAuth
