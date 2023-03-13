import { setOrders } from "@/store/orders.slice";
import { Avatar, Badge, Button, Card, Col, Divider, Grid, Row, Spacer, Table, Text } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ orders }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (!session) return null;
    return (
        <>
        <Card css={
                    {
                        width: "50%",
                        height: "100%",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }
                }>
                    <Text h3 b>Profile</Text>
                    <Avatar src={"https://api-private.atlassian.com/users/97bc37c989b435233b603890fe94c982/avatar"} size="lg" />
                    <Text><b>Username:</b> {session.user.name}</Text>
                    <Text><b>Email:</b> {session.user.email}</Text>


                    <Spacer y={2} />

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
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Card>
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
    const res = await fetch(`${process.env.SERVER_URL}/orders`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.accessToken}`,
        },
    });
    const resJson = await res.json();
    return {
        props: { orders: resJson },
    };
}

export default Profile;