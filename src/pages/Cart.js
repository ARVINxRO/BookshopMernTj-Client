import React from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { clearCart, removeProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
// TEST
const ProductRemoveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log(cart);
  const dispatch = useDispatch();

  const handleClear = () => {
    //clear Cart
    if (cart.products[0]) {
      dispatch(clearCart());
      toast.warn(" CART EMPTY", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("CART IS EMPTY", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleRemoveProduct = (product) => {
    //Remove Product From Cart
    dispatch(removeProduct({ ...product }));
  };
  const handleOrder = (product) => {
    //check cart.total not zero OR cart empty
    if (cart.total !== 0 && user.currentUser) {
      //Add order to DB
      //request to api ,send user._id & cart.products &  cart.total
      const saveOrder = async () => {
        try {
          const res = await userRequest.post("/orders", {
            userId: user.currentUser._id,
            products: cart.products,
            amount: cart.total,
          });
          //on success clear cart
          dispatch(clearCart());
          // notification after purchase
          toast.success("Order Successful!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log(res);
        } catch (err) {
          console.log(err);
          toast.error("ERROR", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      };
      saveOrder();
    } else if (!user.currentUser) {
      toast.error("Login/Register Please ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("CART EMPTY ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR CART</Title>
        <Top>
          <Link to="/">
            <TopButton>Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Cart({cart.quantity})</TopText>
          </TopTexts>
          <TopButton onClick={handleOrder} type="filled">
            Checkout Now
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>{product.title}</ProductName>
                    <ProductId>
                      <b>ISBN : {product.code}</b>
                    </ProductId>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductRemoveContainer>
                    <RemoveCircleIcon
                      onClick={() => handleRemoveProduct(product)}
                    />
                  </ProductRemoveContainer>
                  <ProductPrice>${product.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMERY</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleOrder}>ORDER NOW</Button>
            <Button onClick={handleClear}>Clear Cart</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <ToastContainer />
    </Container>
  );
};

export default Cart;
