import styled from "styled-components";

const Success = () => {
  
const SuccessContainer = styled.div`
background-color:#cffcd1;
width:100%;
height:100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

 const Message = styled.div`
 color:#064708;
 font-size:60px;
 `

  return (
 <SuccessContainer>
  <Message>YOUR ORDER IS SUCCESSFULL</Message>
 </SuccessContainer>
    )
}
export default Success;
