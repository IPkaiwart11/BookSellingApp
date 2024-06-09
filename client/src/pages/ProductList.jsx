import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  
    const handleFilters = (e) => {
      setFilters({
        ...filters,
        [e.target.name]:e.target.value,
      });
    };
  

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Language of Books:</FilterText>
          {/* <Select name="typeOfBook" onChange={handleFilters}>
            <Option  value='Categories'>Categories</Option>
            <Option value="JOKES">JOKES</Option>
            <Option value="GK">GK</Option>
            <Option value="CA">CA</Option>
            <Option value="History">History</Option>
            <Option value="science">science</Option>
            <Option value="Health & Wellness">Health and Wellness</Option>
          </Select> */}
          <Select name="language" onChange={handleFilters}>
            <Option disabled>Language</Option>
            <Option value='hindi'>Hindi</Option>
            <Option value='english'>English</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Books:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      
      <Footer />
    </Container>
  );
};

export default ProductList;
