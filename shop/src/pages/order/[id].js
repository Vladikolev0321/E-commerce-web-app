import { Button, Card, Col, Grid, Image, Row, Text } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = () => {
    const { orders } = useSelector((state) => state.orders);

    const [order, setOrder] = useState({});
    const router = useRouter();

    const currOrder = orders.find((order) => order._id === router.query.id);
    console.log("currOrder", currOrder);



    return (
        <div>
            <Head>
                <title>Order Details</title>
            </Head>
            <Button onPress={() => { router.back() }} shadow color="secondary" >Go back</Button>
            <h1>Order Details</h1>
            <Grid.Container gap={2}>
                <Grid xs={24} md={12}>
                    <Card shadow>
                        <Card.Header>
                            <Text h4>User Details</Text>
                        </Card.Header>
                        <Card.Body>
                            {/* <Row>
                                <Col span={6}>
                                    <Text>Name:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{currOrder.user.name}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Email:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{currOrder.user.email}</Text>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col span={6}>
                                    <Text>Address:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{currOrder.address}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Phone:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{currOrder.mobile}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Order Date:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{new Date(currOrder.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Order Status:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{currOrder.status}</Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={24} md={12}>
                    <Card shadow>
                        <Card.Header>
                            <Text h4>Ordered Items</Text>
                        </Card.Header>
                        <Card.Body>
                            {currOrder.orderedItems.map((item) => (
                                <Row key={item._id} align="middle">
                                    <Col span={6}>
                                        {/* <Card css={{ width: 100, height: 100}}><Card.Image src={item.images[0].url} width={'100%'} height={'100%'} /> </Card> */}
                                        <Image src={item.images[0].url} width={100} height={100} />
                                    </Col>
                                    <Col span={18}>
                                        <Text h4>{item.name}</Text>
                                        <Text>Price: {item.price}</Text>
                                        <Text>Quantity: {item.quantity}</Text>
                                        <Text>
                                            {item.quantity} x ${item.price} = ${item.price * item.quantity}
                                        </Text>
                                    </Col>
                                </Row>
                            ))}
                            <Text h3>Total: ${currOrder.totalPrice}</Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>

            {/* <p>Order ID: {order.id}</p>
      <p>Order Status: {order.status}</p> */}
        </div>
    );
};

export default OrderDetails;