import React from 'react'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div>
      <main className='auth'>
        {children} </main>
    </div>
  )
}

export default Layout
