import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../constants";

export default function DepartmentDetails() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const getData = async () => {
    try {
      let res = await fetch(`${BASE_URL}/department/${id}`, {
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

  // fetch all data
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  // submitting form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fields = e.target.elements;

      const body = {
        departmentName: fields.departmentName.value,
        createdDate: fields.createdDate.value,
      };

      const url = id
        ? `${BASE_URL}/department/${id}`
        : `${BASE_URL}/department`;

      await fetch(url, {
        method: id ? "PUT" : "POST",
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const message = id ? "Update" : "Created";

      alert(message);
      navigate(`/department`);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };
  // return form
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="departmentName">
        <Form.Label>Depart Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Department Name"
          defaultValue={data?.departmentName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createdDate">
        <Form.Label>Created Date</Form.Label>
        <Form.Control
          type="text"
          placeholder="createdDate"
          defaultValue={data?.createdDate}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
