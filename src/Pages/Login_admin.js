import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../api";

export function Login_admin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");
  const userDataInLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("startoon-adminInfo"));

    if (user) navigate("/dashboard");
    // else navigate("/");
  };

  useEffect(() => userDataInLocalStorage(), []);

  const navigate = useNavigate();

  const statusStyles = {
    textAlign: "center",
    color: status === "Login Successfully" ? "green" : "red",
  };

  const getUserCredential = () => {
    setMail("admin@email.com");
    setPassword("Admin@123");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>User Login</h2>
      <div className="login">
        <TextField
          id="email"
          label="Enter Email"
          variant="outlined"
          type="email"
          value={mail}
          onChange={(event) => setMail(event.target.value)}
        />

        <TextField
          id="password"
          label="Enter Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <LoadingButton
          variant="contained"
          color="success"
          type="submit"
          loading={loading}
          onClick={() => {
            if (!mail || !password)
              return setStatus("Please fill out the fields");
            setLoading(true);
            const user = {
              email: mail,
              password: password,
            };
            fetch(`${API}/admin/login`, {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((data) => data.json())

              .then((response) => {
                if (response.message) {
                  setStatus(response.message);
                  localStorage.setItem(
                    "startoon-adminInfo",
                    JSON.stringify(response)
                  );
                  navigate("/dashboard");
                  setLoading(false);
                } else if (response.error) {
                  setStatus(response.error);
                  setLoading(false);
                }
              })
              .catch((err) => {
                setStatus(err.message);
                setLoading(false);
              });
          }}
        >
          Login
        </LoadingButton>
        <Button
          variant="contained"
          color="secondary"
          onClick={getUserCredential}
        >
          To Get User Credential
        </Button>
        <h3 style={statusStyles}>{status}</h3>
      </div>
    </div>
  );
}
