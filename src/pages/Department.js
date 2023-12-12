import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Department() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  // fetch all data
  useEffect(() => {
    const getData = async () => {
      try {
        let res = await fetch(`${BASE_URL}/department`, {
          headers: {
            Accept: "*",
            "Content-Type": "application/json",
          },
        });

        const data1 = await res.json();
        setData(data1);
      } catch (error) {
        console.log(error);
        alert("Something went wrong!");
      }
    };

    getData();
  }, []);

  // delete any record
  const handDelete = async (id) => {
    try {
      await fetch(`${BASE_URL}/department/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
      });

      const a = data.filter((item) => item.deptId != id);
      setData(a);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // navigate to details page
  const handelEdit = async (id) => {
    navigate(`/department/${id}`);
  };

  return (
    <div>
      <h3>Department</h3>

      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#deptID</th>
              <th>Depart Name</th>
              <th>Created Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item?.deptId}</td>
                <td>{item?.departmentName}</td>
                <td>{item?.createdDate}</td>
                <td>
                  <Button onClick={() => handelEdit(item.deptId)}>Edit</Button>
                  <Button
                    onClick={() => handDelete(item.deptId)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Button variant="primary" onClick={() => navigate(`/department/add`)}>
        Add New
      </Button>
    </div>
  );
}
