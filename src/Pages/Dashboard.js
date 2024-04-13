import Table from "@mui/joy/Table";
import { useEffect, useState } from "react";
import { API } from "../api";

export function Dashboard() {
  const [usersList, setUsersList] = useState(null);

  const getUsers = () => {
    fetch(`${API}/users`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((users) => setUsersList(users));
  };

  useEffect(() => getUsers(), []);

  return usersList ? (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Name</th>
          <th>Email</th>
          <br />
          <th>Count</th>
          <th>Gender</th>
          <th>Last Login</th>
          {/* <th>Protein&nbsp;(g)</th> */}
        </tr>
      </thead>
      <tbody>
        {usersList?.map((user) => (
          <tr>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <br />
            <td>{user.count}</td>
            <td>{user.gender}</td>
            <td>{user.lastLoggedIn}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  ) : (
    "Loading..."
  );
}
