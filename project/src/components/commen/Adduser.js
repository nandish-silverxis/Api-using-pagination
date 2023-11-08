import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Adduser() {

    const [formvalue,setFormvalue]=useState({title:'',body:''})
    const navigate=useNavigate();
    const [massage,setMassage]=useState('');
    const [error,setError]=useState({title:'',body:''})

    const handelinput = (e)=>
    {
    
        const {name,value}=e.target;
        setFormvalue({...formvalue,[name]:value});
    }
    const validate =()=>
        {
            if(!formvalue.title)
            {
                error.title=" Title is required"
            }
            else{
                error.title=" "
            }

            if(!formvalue.body)
            {
                error.body=" body is required"
            }
            else{
                error.body=" "
            }

            return error;
        }
    const handlesubmit =async(e)=>
    {
        e.preventDefault();
        const allInputvalue={ title :formvalue.title, body :formvalue.body}

        const errorData =validate();
        console.log(errorData)
        setError((prevState) => ({
            ...prevState,
            ...errorData,
          }));
        
        if(Object.keys(errorData).length === 0)
        {
            alert("Done")
            console.log(allInputvalue)
        }

        let res= await fetch("https://sbposbackend.onrender.com/api/v1/posts",
        {
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(allInputvalue)
        });

        let resjson=await res.json();
        if(res.status===200)
        {
            setMassage("user data inserted successfully")
            setTimeout(()=>
            {
                navigate('/Userdata');
            },2000)
        }
        else{
            setMassage("some error occured")
        }

          
        
        
       
        
    }

  return (
    <div>
      <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <h5 className='mt-2'>Add new user</h5>
                <p>{ massage }</p>
                <form onSubmit={handlesubmit}>
                    <div className='row'>
                    
                        <div className='col-md-6'>
                            <div className='mb-3>'>
                                <lable className='form-lable'>Title</lable>
                                <input type='text' name="title" className='form-control' value={formvalue.title} onChange={handelinput}/>
                               {error.title && <div className='error'>{error.title}</div>}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3>'>
                                <lable className='form-lable'>Body</lable>
                                <input type='text' name="body" className='form-control' value={formvalue.body} onChange={handelinput}/>
                                {error.body && <div className='error'>{error.body}</div>}                              
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='mb-3>'>
                                <lable className='form-lable'></lable>
                                <button type='submit' className='btn btn-success btn-sm d-grid d-md-flex justify-content-md-end mb-3 my-2'>submit</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

        </div>
     </div>
    </div>
  )
}

export default Adduser;
