import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

export default function EmployeeDetails() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const getData = async () => {
    try {
      let res = await fetch(`${BASE_URL}/employee/${id}`, {
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // fetch employee by id
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  // submitting employee form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fields = e.target.elements;

      const body = {
        name: fields.name.value,
        departmentID: fields.departmentID.value,
        designation: fields.designation.value,
        salary: fields.salary.value,
        birthDate: fields.birthDate.value,
        joinDate: fields.joinDate.value,
        status: fields.status.value,
        createdDate: fields.createdDate.value,
        updateDate: fields.updateDate.value,
      };

      // if id present on param then update or create
      const url = id ? `${BASE_URL}/employee/${id}` : `${BASE_URL}/employee`;

      const response = await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.status == 200 || response.status == 201) {
        const message = id ? "Update" : "Created";
        alert(message);
        navigate(`/`);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };
  // return from for create or update employee
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>name</Form.Label>
        <Form.Control
          type="text"
          placeholder="User Name"
          defaultValue={data?.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="departmentID">
        <Form.Label>departmentID</Form.Label>
        <Form.Control
          type="text"
          placeholder="departmentID"
          defaultValue={data?.departmentID}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="designation">
        <Form.Label>designation</Form.Label>
        <Form.Control
          type="text"
          placeholder="designation"
          defaultValue={data?.designation}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="salary">
        <Form.Label>salary</Form.Label>
        <Form.Control
          type="text"
          placeholder="salary"
          defaultValue={data?.salary}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="birthDate">
        <Form.Label>birth date</Form.Label>
        <Form.Control
          type="text"
          placeholder="birthDate"
          defaultValue={data?.birthDate}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="joinDate">
        <Form.Label>Join Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="joinDate"
          defaultValue={data?.joinDate}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="status"
          defaultValue={data?.status}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createdDate">
        <Form.Label>created date</Form.Label>
        <Form.Control
          type="text"
          placeholder="createdDate"
          defaultValue={data?.createdDate}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="updateDate">
        <Form.Label>update date</Form.Label>
        <Form.Control
          type="text"
          placeholder="updateDate"
          defaultValue={data?.updateDate}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
