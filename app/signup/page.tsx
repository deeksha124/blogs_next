// import React from "react";
// import "../signup/signup.css";

// function LoginPage() {
//   return (
//     <div className="form-container">
//       <h1>SIGNUP</h1>
//       <form>
//         <div className="form-group">
//         <div>
//             <label htmlFor="Name">Name:</label>
//             <input type="text" id="Name" name="Name" placeholder="Name" required />
//           </div>
//           <div>
//             <label htmlFor="Email">Email:</label>
//             <input type="text" id="Email" name="Email" placeholder="Email" required />
//           </div>
//           <div>
//             <label htmlFor="Phone">Phone:</label>
//             <input type="number" id="Phone" name="Phone" placeholder="12344567890" required />
//           </div>
//           <div>
//             <label htmlFor="password">password:</label>
//             <input type="text" id="password" name="password" placeholder="password" required />
//           </div>
          
          
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;



"use client";
import React, { useState, FormEvent } from "react";

const SignupPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>(''); 
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 
  const [responseMessage, setResponseMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, email, phone, password };

    try {
      const response = await fetch('http://192.168.8.237:5000/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
   
     console.log("response----" , response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      setResponseMessage(`User created: ${data.message}`);
      
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
    } catch (error) {
      setResponseMessage(`Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default SignupPage;
