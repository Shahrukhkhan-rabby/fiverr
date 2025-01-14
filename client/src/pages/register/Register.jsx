import React, { useState } from "react";
import "./Register.scss";
import upload from "../../utils/upload.js";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
    phone: "",
  });

  const navigate = useNavigate
  
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    })
  }
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()


    const url = await upload(file)
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
}
  };

      return (
        <div className="register">
          <form onSubmit={handleSubmit}>
            <div className="left">
              <h1>Create a new account</h1>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input name="password" type="password" onChange={handleChange} />
              <label htmlFor="img">Profile Picture</label>
              <input name="img" type="file" onChange={e => setFile(e.target.files[0])} />
              <label htmlFor="country">Country</label>
              <input
                name="country"
                type="text"
                placeholder="USA"
                onChange={handleChange}
              />
              <button type="submit">Register</button>
            </div>

            <div className="right">
              <h1>I want to become a seller</h1>
              <div className="toggle">
                <label htmlFor="isSeller">Activate the seller account</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={handleSeller}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <label htmlFor="phone">Phone Number</label>
              <input
                name="phone"
                type="text"
                placeholder="+1 234 567 89"
                onChange={handleChange}
              />
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                placeholder="A short description of yourself"
                cols="30"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </div>
      )
    }
  
export default Register