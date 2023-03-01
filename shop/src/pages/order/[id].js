import { Button, Image, Text } from "@nextui-org/react";
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
            <Button onPress={() => { router.back() }}>Go back</Button>
            {/* { order.map((item) => (

        )
        } */}
            <h1>Order Details</h1>
            <Text>Name: {currOrder.user.name}</Text>
            <Text>Email: {currOrder.user.email}</Text>
            <Text>Address: {currOrder.address}</Text>
            <Text>Phone: {currOrder.mobile}</Text>
            <Text>Order Date: {currOrder.createdAt}</Text>
            <Text>Order Status: {currOrder.status}</Text>
            <Text>Ordered items:</Text>
            {currOrder.orderedItems.map((item) => (
                <div>
                    <Image src={item.images[0].url} width={100} height={100}></Image>
                    <Text>Name: {item.name}</Text>
                    <Text>Price: {item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                    {item.quantity} x ${item.price} = ${item.price * item.quantity}
                </div>
            ))}

            <Text>Total: ${currOrder.totalPrice}</Text>

            {/* <p>Order ID: {order.id}</p>
      <p>Order Status: {order.status}</p> */}
        </div>
    );
};

export default OrderDetails;