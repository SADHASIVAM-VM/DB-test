import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [admin, setAdmin] = useState(false);
  const [adminDatas, setAdminDatas] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
   try{
    await fetch("http://localhost:3000/login",{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name:username, email,password})
    })
    .then(()=> console.log("successfully posted"))
   
   }
   catch(err){
    console.log(err.message)
   }

   if(username === "admin" && password === "password"){
    setAdmin(true)
   }
   else{
    setAdmin(false)
   }
  };

  const handleUserDatas = async()=>{
    await fetch("http://localhost:3000/loginUser",{
      method:"get"
    }).then((res)=> res.json())
    .then((res)=> setAdminDatas(res.showProduct))
  }

  return (
    <>
    <form onSubmit={handleSubmit} method='post'>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">User Email:</label>
        <input
          type="mail"
          id="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {admin &&
      <button  onClick={()=>handleUserDatas()}>See User List</button>

      }

    </form>
    <hr />

    <div>
      {adminDatas &&
      <table style={{ border: "2px solid white",borderCollapse:"collapse" }}>
      <thead>
        <tr>
          <th>Username</th> 
          <th>Password</th>
        </tr>
      </thead>
      <tbody >
        {adminDatas.map((item) => (
          <tr key={item._id} >
            <td style={{border:"1px solid white"}}>{item.name}</td>
            <td style={{border:"1px solid white"}}>{item.password}</td> 
          </tr>
        ))}
      </tbody>
    </table>
      }
    </div>
    </>
  );
}

export default Login;
