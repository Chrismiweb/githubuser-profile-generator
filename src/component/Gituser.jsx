import React, { useEffect, useState } from 'react'
import './Git.css'
import chrismi from '../image/chrismi.jpeg'
function Gituser() {
    const[githudDetails, setGithubDetails] = useState(null);
    const [search, setSearch] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSearch = (e)=>{
        const tp = e.target.value;
        setSearch(tp)
    }
    const fetchApi =async(e)=>{
        e.preventDefault()
        setisLoading(true)
        setErr(true)

        try {
            await fetch(`https://api.github.com/users/${search}`)
        .then(response =>response.json())
        .then(gitUser => {
            // const msg = gitUser.message;
            const {message} = gitUser
            setErrMsg(message)
            setGithubDetails(gitUser)
            setisLoading(false)
        })  
        } catch (error) {
            setErr(true)
            console.log(error);
        }

        console.log(githudDetails);
    }    
  return (
    <div className='container'>
        <div className='aboutme'>
            <div className='mymsg'>
                <h1>Github Profile Generator</h1>
                <p>Built by Chrismi</p>
            </div>
            <div className='mypics'>
                <img src={chrismi} alt="" />
            </div>
        </div>
        <div className='errormsg'>
                {
                    err? <h2>  {errMsg}</h2> : null
                }
        </div>
        <div className='gitinput'>
            <input type="text" placeholder='Search Github Account' onChange={handleSearch} />
            <button onClick={fetchApi}>search</button>
        </div>
        {
          isLoading?"Loading .." : githudDetails && (
                <div className='gitinfo'>
                    <div className='gitprofile'>
                        <img src={githudDetails.avatar_url} alt="" />
                    </div>
                    <div className='gitcredentials '>
                        <h1>{githudDetails.login + " as an account with Github"}</h1>
                        {/* <p>{githudDetails.following_url}</p> */}
                        {/* <h2>{githudDetails.gists_url}</h2> */}
                    </div>
                    
                </div>
           )
        }
    </div>
  )
}

export default Gituser