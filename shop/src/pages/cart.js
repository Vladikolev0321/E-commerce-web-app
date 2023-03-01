import { decrementQuantity, incrementQuantity, removeAllFromCart, removeFromCart } from "@/store/cart.slice";
import { Button, Card, Col, Grid, Image, Input, red, Row, Spacer, Table, Text } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const { status, data } = useSession();
  const cart = useSelector(state => state.cart);
  console.log("cart", cart);

  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const result = cart.reduce((prev, item) => {
      return prev + (item.price * item.quantity);
    }, 0);
    setTotal(result);
  }, [cart]);

  const handleCheckout = async () => {
    if(cart.length === 0 || !mobile || !address) {
      // TODO: Notify user to input information
      return;
    }

    if (status !== "authenticated") {
        // TODO: Notify user to login
        // TODO: Redirect to login page
        return;
    }


    console.log("checkout");
    const res = await fetch(`http://localhost:3001/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.accessToken}`,
      },
      body: JSON.stringify({
        mobile,
        address,
        orderedItems: cart,
        totalPrice: total,
      }),///
    });

    const resJson = await res.json();
    console.log("resJson", resJson);

    if (res.status === 201) {
      console.log("here")
      // remove all items from cart
      dispatch(removeAllFromCart());
      // TODO: Notify user that order is placed
    }

  }


  const columns = [
    {
      key: "image",
      // label: "IMAGE",
    },
    {
      key: "title",
      label: "NAME",
    },
    {
      key: "price",
      label: "ROLE",
    },
    {
      key: "quantity",
      label: "STATUS",
    },
    {
      key: "action",
      label: "ACTION",
    },
  ];

  if(cart.length === 0)
    return ( <h1>Cart is empty</h1> );

  return (
    <>
      <h1>Shopping Cart</h1>
      {/* <Row> */}

      <Grid.Container gap={2} justify="center">

        <Grid xs={12} sm={10}>
          <Row>
            <Table
              aria-label="cart table"
              css={{
                height: "auto",
                minWidth: "100%",
                width: 700,
              }}
            >
              <Table.Header columns={columns}>
                {(column) => (
                  <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
              </Table.Header>
              <Table.Body items={cart}>
                {(item) => (
                  <Table.Row key={item._id}>
                    <Table.Cell><Image width={100} height={100} src={item.images[0].url} /></Table.Cell>
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell>
                      <Row>
                        <Button size="xs" color="error" auto onPress={() => dispatch(decrementQuantity(item._id))}>-</Button>
                        <Spacer x={0.5} />
                        {item.quantity}
                        <Spacer x={0.5} />
                        <Button size="xs" color="success" auto onPress={() => dispatch(incrementQuantity(item._id))}>+</Button>
                      </Row>
                    </Table.Cell>
                    <Table.Cell><Button color="error" auto onPress={() => dispatch(removeFromCart(item._id))}>Remove</Button></Table.Cell>

                    {/* {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>} */}
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
            <Grid xs={12} sm={4}>

              <Col>
                <Input width="120px" clearable bordered fullWidth color="primary" size="lg"
                  placeholder="Address" aria-label="Address" name="address"
                  value={address} onChange={e => setAddress(e.target.value)}
                />
                <Input width="120px" clearable bordered fullWidth color="primary" size="lg"
                  placeholder="Mobile" aria-label="Mobile" name="mobile"
                  value={mobile} onChange={e => setMobile(e.target.value)}
                />
              </Col>
            </Grid>
          </Row>

        </Grid>
        <Grid xs={12} sm={10}>
          <Col>
            <Text h3> Total: {total}</Text>
            {/* <Row justify="flex-end"> */}
            <Button color="success" auto onPress={handleCheckout}>Checkout</Button>
            {/* </Row> */}
          </Col>
        </Grid>
      </Grid.Container>

      {/* </Row> */}
    </>
  );
}


export default Cart;