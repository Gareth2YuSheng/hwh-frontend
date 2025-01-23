import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";
import { postRequest } from "../helpers/httpRequests";

interface Props {
  mode: "LOGIN" | "REGISTER"
}

export default function Login({ mode }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setAlertVisible(false);
    if (mode === "REGISTER" && password !== confirmPassword) {
      setAlertMessage("Passwords Do No Match!");
      setAlertVisible(true);
      return;
    }

    if (mode === "LOGIN") {
      try {
        const response = await postRequest(`/account/login`, 
          JSON.stringify({
            "username": username,
            "password": password
          }), 
          {"Content-Type": "application/json"});
        const content = await response.json();
        if (content.success) {
          const token = content.data.accessToken;
          Cookies.set("hwh-jwt", token, { expires: 2 }); //secure: true once backend uses https
          resetFields();
          navigate(`/`);
        } else if (content.message.startsWith("Login Failed")) {
          setAlertMessage("Incorrect Username or Password");
          setAlertVisible(true);  
        }
      } catch (err) {
        console.log("Error:", err);
      }
    } else if (mode === "REGISTER") {
      try {
        const response = await postRequest(`/account/register`, 
          JSON.stringify({
            "username": username,
            "password": password
          }),
          {"Content-Type": "application/json"});
        const content = await response.json();
        if (content.success) {
          resetFields();
          navigate(`/login`);
        } else if (content.message === "User Already Exists") {
          setAlertMessage(content.message);
          setAlertVisible(true);  
        }
      } catch (err) {
        console.log("Error:", err);
      }
    }
  };

  const resetFields = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      {alertVisible && alertMessage !== "" && <Alert variant="danger">{alertMessage}</Alert>}
      <Form style={{}} onSubmit={handleSubmit}>
        <h1 className="mb-4">{mode === "LOGIN" ? "Login" : "Sign Up"}</h1>
        <FloatingLabel 
          controlId="floatingInput"
          label="Username"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Username" required
            value={username} 
            onChange={e => setUsername(e.target.value)}
            />
        </FloatingLabel>
        <FloatingLabel 
          controlId="floatingPassword" 
          label="Password (Optional)"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password"
            value={password} 
            onChange={e => setPassword(e.target.value)}
            />
        </FloatingLabel>
        {mode === "REGISTER" && <FloatingLabel 
          controlId="floatingConfirmPassword" 
          label="Confirm Password (Optional)"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Confirm Password" 
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </FloatingLabel>}
        <Button variant="primary" className="mb-2 w-100" type="submit">{mode === "LOGIN" ? "Login" : "Sign Up"}</Button>
        {mode === "LOGIN" ? 
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p> : 
        <p>Already have an account? <Link to="/login">Login Now</Link></p>}
      </Form>
    </>
  );
}
