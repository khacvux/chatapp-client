import React from 'react'

type Props = {}

const UserUnvailable = (props: Props) => {
  return (
    <div className='flex flex-row items-center justify-start space-x-2'>
      <img src="https://i.pinimg.com/564x/fe/f9/e5/fef9e5889245360d5df507be59276e17.jpg" alt="avatar"
      className='w-[45px] h-[45px] rounded-full' />
      <p className='text-[13px] font-light'>User offline</p>
    </div>
  )
}

export default UserUnvailable