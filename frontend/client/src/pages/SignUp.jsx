import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import  { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) =>{
    // console.log(e.target.value);
    setFormData({...formData, [e.target.id]: e.target.value.trim()});

  };
  console.log(formData);

  //this method use to awit the function calling and load the data from database
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(!formData.username || formData.email || formData.password) {
      return setErrorMessages('Please fill out all the field');


    }
    try {
      setLoading(true);
      setErrorMessages(null);
      const res = await fetch('/api/auth/signup', {
        method:'POST',
        headers: {'Content-Type' : 'application/jason'},
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success == false){
        return setErrorMessages(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessages(error.message);
    }

  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/*left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>UTMS</span>
            Web
          </Link>
          <p className='text-sm mt-5'>
            This is the University Managenmnt System Sign Up page with your email password or google acount
          </p>
        </div>
        {/*right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className=''>
              <Label value='Your username'></Label>
              <TextInput
                 type='text'
                 placeholder='Username'
                 id='username'
                 onChange={handleChange}

              />
            </div>

            <div className=''>
              <Label value='Your email'></Label>
              <TextInput
                 type='email'
                 placeholder='name@mail.com'
                 id='email'
                 onChange={handleChange}
              />
            </div>

            <div className=''>
              <Label value='Your password'></Label>
              <TextInput
                 type='password'
                 placeholder='Password'
                 id='password'
                 onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ? (
                  <>
                   <Spinner size='sm'/>
                  <span className='pl-3'>Loading.....</span>
                  </>
                 
                ) : 'Sign Up'

              }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>Sign in</Link>

          </div>
          {
            errorMessages && (
              <Alert className='mt-5' color='failure'>
                {errorMessages}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
