import { setOrders } from "@/store/orders.slice";
import { Badge, Button, Card, Col, Row, Spacer, Table, Text } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ orders }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log("status", status);
    console.log("session", session);

    if (!session) return null;

    // const dispatch = useDispatch();
    // dispatch(setOrders(orders));



    return (
        <>
            <h1>Profile Page</h1>
            <Row>
                <Col>
                    <Card>
                        <Text h3>Profile</Text>
                        <Text>Username: {session.user.name}</Text>
                        <Text>Email: {session.user.email}</Text>
                    </Card>
                </Col>
                <Spacer x={2} />
                <Col>
                    <Card>
                        <Text h3>Orders</Text>
                        <Table
                            aria-label="cart table"
                            css={{
                                height: "auto",
                                minWidth: "100%",
                                width: 700,
                            }}
                        >
                            <Table.Column>ID</Table.Column>
                            <Table.Column>DATE</Table.Column>
                            <Table.Column>TOTAL</Table.Column>
                            <Table.Column>DELIVERED</Table.Column>
                            <Table.Column>PAID</Table.Column>
                            <Table.Column>ACTION</Table.Column>
                            <Table.Body items={orders}>
                                {(item) => (
                                    <Table.Row key={item._id}>
                                        <Table.Cell>{item._id}</Table.Cell>
                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}</Table.Cell>
                                        <Table.Cell>${item.totalPrice}</Table.Cell>
                                        <Table.Cell>{item.isDelivered ? <Badge color="success">DELIVERED</Badge> : <Badge color={"error"}>NOT DELIVERED</Badge>}</Table.Cell>
                                        <Table.Cell>{item.paid ? <Badge color="success">PAID</Badge> : <Badge color={"error"}>NOT PAID</Badge>}</Table.Cell>
                                        <Table.Cell><Button as={Link} href={`/orders/${item._id}`} auto>Details</Button></Table.Cell>

                                        {/* <Table.Cell><Image width={100} height={100} src={item.images[0].url} /></Table.Cell>
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
                                        <Table.Cell><Button color="error" auto onPress={() => dispatch(removeFromCart(item._id))}>Remove</Button></Table.Cell> */}

                                        {/* {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>} */}
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }
    console.log("session", session)
    const res = await fetch(`${process.env.SERVER_URL}/orders`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });
    const resJson = await res.json();
    console.log("resJson", resJson);
    return {
        props: { orders: resJson },
    };
}

export default Profile;