import React from 'react'

const Navbar = () => {
  const user =
    localStorage.getItem('currentUser') !== null
      ? JSON.parse(localStorage.getItem('currentUser'))
      : null
  // console.log(localStorage.getItem('currentUser'))
  function logout () {
    localStorage.removeItem('currentUser')
    window.location.href = '/login'
  }
  // logout()
  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <a className='navbar-brand' href='/'>
          MYSTILODGES
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'>
            <i class='far fa-bars' style={{ color: 'white' }}></i>
          </span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-5'>
            {user ? (
              <>
                <li className='nav-item active'>
                  <a className='nav-link' href='/profile'>
                    {user.name}
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/home' onClick={logout}>
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item active'>
                  <a className='nav-link' href='/register'>
                    Register
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='/login'>
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default Navbar
