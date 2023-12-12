import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

// display all employee

export default function Employee() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // fetch all employee data
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch(`${BASE_URL}/employee`, {
          headers: {
            Accept: "*",
            "Content-Type": "application/json",
          },
        });

        const data1 = await res.json();
        setData(data1);
      } catch (error) {}
    };

    getData();
  }, []);

  // delete any record
  const handDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/employee/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
      });

      // remove deleted data
      const a = data.filter((item) => item.id != id);
      setData(a);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // navigate to details page
  const handelEdit = async (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div>
      <h3>Employee</h3>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#id</th>
              <th>Name</th>
              <th>DepartmentId</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Birth Date</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
                <td>{item?.departmentID}</td>
                <td>{item?.designation}</td>
                <td>{item?.salary}</td>
                <td>{item?.birthDate}</td>
                <td>{item?.joinDate}</td>
                <td>{item?.status}</td>
                <td>{item?.createdDate}</td>
                <td>{item?.updateDate}</td>
                <td>
                  <Button onClick={() => handelEdit(item.id)}>Edit</Button>
                  <Button onClick={() => handDelete(item.id)} variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button variant="primary" onClick={() => navigate(`/employee/add`)}>
        Add New
      </Button>
    </div>
  );
}
