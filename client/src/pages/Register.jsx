

import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://img.freepik.com/free-photo/books-stack-with-copy-space_23-2148898280.jpg?w=996&t=st=1700946483~exp=1700947083~hmac=ded60f832cc1141933e20b9d0e052de593e2277377d5cc167c532ba0a17a572c")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: '',
    isAdmin: 'false',
  });
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      register(dispatch, formData, navigate);
      console.log("Registration successful");
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="First Name"
            type="text"
            name="firstName"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Last Name"
            type="text"
            name="lastName"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="username"
            type="text"
            name="username"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Mobile No."
            type="number"
            name="phoneNumber"
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="dateOfBirth"
            onChange={handleChange}
            required
          />
          <Select
            name="gender"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="other">Other</option>
          </Select>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            required
          />
          <Button disabled={isFetching}>
            REGISTER
          </Button>
          <h3>
            If you already have an account?
            <NavLink to="/">
              <b> Click here to Login</b>
            </NavLink>
          </h3>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
