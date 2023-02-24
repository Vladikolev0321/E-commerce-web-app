import { decrementQuantity, incrementQuantity, removeFromCart } from "@/store/cart.slice";
import { Button, Card, Col, Grid, Input, red, Row, Spacer, Table, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector(state => state.cart);

  console.log("cart", cart);

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const result = cart.reduce((prev, item) => {
      return prev + (item.price * item.quantity);
    }, 0);
    setTotal(result);
  }, [cart]);


  const columns = [
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

  return (
    <>
      <h1>Shopping Cart</h1>
      <Row>

        <Grid.Container gap={2} justify="center">

          <Grid xs={12} sm={10}>
            <Table
              aria-label="Example table with static content"
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

          </Grid>
          <Grid xs={12} sm={10}>
            <Col>
              <Text h3> Total: {total}</Text>
              <Row justify="flex-end">
                <Button color="success" auto>Checkout</Button>
              </Row>
            </Col>
          </Grid>
        </Grid.Container>

      </Row>
    </>
  );
}


export default Cart;