
import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// const { isFetching, error } = useSelector((state) => state.user);
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

// const Agreement = styled.span`
//   font-size: 12px;
//   margin: 20px 0px;
// `;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();

    // Add additional validation logic if needed
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    register(dispatch, { username, email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Register</Title>
        <Form>
          <Input
            placeholder="username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            REGISTER
          </Button>
          {/* {error && <Error>{error.message}</Error>} */}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
