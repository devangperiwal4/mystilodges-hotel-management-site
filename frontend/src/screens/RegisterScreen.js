import react, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Success from '../components/Success'

const RegisterScreen = () => {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState(false)
  const [success, setsuccess] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/home'
    }
  }, [])

  async function register (e) {
    e.preventDefault()
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      console.log(user)
      try {
        setloading(true)
        const result = await axios.post('/api/users/register', user).data
        localStorage.setItem('currentUser', JSON.stringify(result))
        window.location.href = '/home'

        setloading(false)
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')
      } catch (error) {
        console.log(error)
        setloading(false)
        seterror(true)
      }
    } else {
      alert('Password didnt match.')
    }
  }

  return (
    <div>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Error />
      ) : (
        <div className='row justify-content-center mt-5'>
          <div className='col-md-5'>
            {success && <Success success='Registered Successfully' />}
            <div className='bs'>
              <h2>Register</h2>
              <form onSubmit={register}>
                <input
                  type='text'
                  className='form-control'
                  placeholder='name'
                  value={name}
                  required
                  onChange={e => {
                    setname(e.target.value)
                  }}
                />
                <input
                  className='form-control'
                  name='email'
                  type='email'
                  placeholder='email'
                  value={email}
                  required
                  onChange={e => {
                    setemail(e.target.value)
                  }}
                />
                <input
                  type='password'
                  className='form-control'
                  placeholder='password'
                  value={password}
                  required
                  onChange={e => {
                    setpassword(e.target.value)
                  }}
                />
                <input
                  type='password'
                  className='form-control'
                  placeholder='confirm password'
                  value={cpassword}
                  required
                  onChange={e => {
                    setcpassword(e.target.value)
                  }}
                />
                <input
                  type='submit'
                  value='Submit'
                  className='btn btn-primary mt-3'
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default RegisterScreen
