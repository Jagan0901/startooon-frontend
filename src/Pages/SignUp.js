import { useNavigate } from "react-router-dom";
import { API } from "../api";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";

export function SignUp() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const statusStyles = {
    textAlign: "center",
    color: status === "Created Successfully" ? "green" : "red",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "10%" }}>Sign Up</h2>
      <form className="login">
        <TextField
          variant="outlined"
          id="email"
          label="Enter Name"
          type="text"
          placeholder="Enter Name"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="outlined"
          id="email"
          label="Create Email"
          type="email"
          placeholder="Create new email"
          onChange={(event) => setMail(event.target.value)}
        />
        <TextField
          variant="outlined"
          id="password"
          label="Create Password"
          type="password"
          placeholder="Create new password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="User gender"
          variant="outlined"
          type="text"
          placeholder="Enter Male, Female or other "
          onChange={(event) => setGender(event.target.value)}
        />

        <LoadingButton
          variant="contained"
          color="primary"
          loading={loading}
          onClick={() => {
            if (!mail || !password || !name || !gender)
              return setStatus("Please fill out the fields");

            if (
              gender === "Male" ||
              gender === "Female" ||
              gender === "Other"
            ) {

              
            setLoading(true);

            const newUser = {
              email: mail,
              password: password,
              name: name,
              gender: gender,
            };

            fetch(`${API}/users/signup`, {
              method: "POST",
              body: JSON.stringify(newUser),
              headers: { "Content-Type": "application/json" },
            })
              .then((data) => data.json())

              .then((response) => {
                if (response.message) {
                  setStatus(response.message);
                  navigate("/");
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
              
            }else{
              return setStatus("Gender should be Male,Female or Other");

            }

          }}
        >
          Sign Up
        </LoadingButton>
        <h3 style={statusStyles}>{status}</h3>
      </form>
    </div>
  );
}
