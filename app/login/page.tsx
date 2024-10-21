import React from "react";
import "../login/login.css";

function LoginPage() {
  return (
    <div className="form-container">
      <h1>LOGIN  </h1>
      <form>
        <div className="form-group">
          <div>
            <label htmlFor="Email">Email:</label>
            <input type="text" id="Email" name="Email" placeholder="Email" required />
          </div>
          <div>
            <label htmlFor="password">password:</label>
            <input type="text" id="password" name="password" placeholder="password" required />
          </div>
          
          
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
