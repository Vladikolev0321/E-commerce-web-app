import { Button, Card, Col, Grid, Image, Row, Text } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

const OrderDetails = ( {order} ) => {
    const { data: session, status } = useSession();
    // const { orders } = useSelector((state) => state.orders);

    // const [order, setOrder] = useState({});
    const router = useRouter();

    // const order = orders.find((order) => order._id === router.query.id);
    // console.log("order", order);


    // TODO: Add check for session
    if(!session){
        return null;
    }
    return (
        <div>
            <Head>
                <title>Order Details</title>
            </Head>
            
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
                                    <Text>{order.user.name}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Email:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{order.user.email}</Text>
                                </Col>
                            </Row> */}
                            <Row>
                                <Col span={6}>
                                    <Text>Address:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{order.address}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Phone:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{order.mobile}</Text>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Text>Order Date:</Text>
                                </Col>
                                <Col span={18}>
                                    <Text>{new Date(order.createdAt).toLocaleDateString("en-US", {
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
                                    <Text>{order.status}</Text>
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
                            {order.orderedItems.map((item) => (
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
                            <Text h3>Total: ${order.totalPrice}</Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
            <Button css={{width: '100%'}} onPress={() => { router.back() }} shadow color="secondary" >Go back</Button>

            {/* <p>Order ID: {order.id}</p>
      <p>Order Status: {order.status}</p> */}
        </div>
    );
};

// TODO: Add getServerSideProps to fetch order details

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }
    const order = await fetch(`http://localhost:3001/orders/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`
        },
    });
    console.log("order", order);

    const orderData = await order.json();
    console.log("order", orderData  );


    return {
        props: {
            order: orderData.order,
        },
    };
}

export default OrderDetails;