import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import CustomizedSnackbar from "../components/CustomizedSnackbar";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

// const FilterTitle = styled.span`
//   font-size: 20px;
//   font-weight: 200;
// `;

const FilterTypeOfBook = styled.select`
  width: 150px;
  height: 30px;
  border-radius: 5%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
// background-color: ${(props) => props.color};

const FilterTypeOfBookOption = styled.option``;

// const FilterTypeOfBook = styled.select`
//   margin-left: 10px;
//   padding: 5px;
// `;


const FilterLanguage = styled.select`
width: 150px;
height: 30px;
border-radius: 5%;
background-color: ${(props) => props.color};
margin: 0px 5px;
cursor: pointer;
`;

const FilterLanguageOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [typeOfBook, setTypeOfBook] = useState({});
  // const [language, setLanguage] = useState([]);
  const [typeOfBook, setTypeOfBook] = useState(product.typeOfBook && product.typeOfBook.length > 0 ? product.typeOfBook[0] : '');
const [language, setLanguage] = useState(product.language && product.language.length > 0 ? product.language[0] : '');

  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/"+id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  const handleClick = () => {
    const uniqueId = uuidv4();
    dispatch(
      addProduct({ ...product,typeOfBook,language, quantity,id: uniqueId })
    );
    setOpenSnackbar(true);
  };
  return (
    <> 
       <Navbar />
      <Announcement />
    <Container>
      
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs {product.price}</Price>
         
          <FilterContainer>
            
            <Filter>
              {/* <FilterTitle>Type of Book</FilterTitle>
              <FilterTypeOfBook onChange={(e) => setTypeOfBook(e.target.value)}>
                {product.typeOfBook?.map((c) => (
                  <FilterTypeOfBookOption key={c}>{c}</FilterTypeOfBookOption>
                 ))}
              </FilterTypeOfBook> */}
              <FilterTypeOfBook onChange={(e) => setTypeOfBook(e.target.value)}>
  <option disabled selected value="">Select Type of Book</option>
  {product.typeOfBook?.map((c) => (
    <FilterTypeOfBookOption key={c}>{c}</FilterTypeOfBookOption>
  ))}
</FilterTypeOfBook>

            </Filter>

             </FilterContainer>
             <FilterContainer>
            <Filter>
              
              <FilterLanguage onChange={(e) => setLanguage(e.target.value)}>
  <option disabled selected value="">Select Language</option>
  {product.language?.map((s) => (
    <FilterLanguageOption key={s}>{s}</FilterLanguageOption>
  ))}
</FilterLanguage>

            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
          <CustomizedSnackbar open={openSnackbar} close={handleClose}/>
          <ReviewList bookId={id} />
          <hr />
          <ReviewForm bookId={id} />
        </InfoContainer>
        
      </Wrapper>
      {/* <Newsletter /> */}
     
    </Container>
     <Footer />
     </>

  );
};

export default Product;

