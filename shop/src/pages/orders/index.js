import { Badge, Button, Card, Table, Text } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import Link from "next/link";

const Orders = ({ orders }) => {
    return (
        <>
            <Card>
                <Text h3 css={{ as: 'center', mb: '20px',}} weight="bold" size={30}>Orders</Text>
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
                                <Table.Cell>{ item.isDelivered ? <Badge color="success">DELIVERED</Badge> : <Badge color={"error"}>NOT DELIVERED</Badge>}</Table.Cell>
                                <Table.Cell>{ item.paid ? <Badge color="success">PAID</Badge> : <Badge color={"error"}>NOT PAID</Badge>}</Table.Cell>
                                <Table.Cell><Button as={Link} href={`/orders/${item._id}`} auto>Details</Button></Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
        </>
    );
}
export default Orders;


export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/signin",
                permanent: false,
            },
        };
    }

    const res = await fetch(`${process.env.SERVER_URL}/all-orders`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`,
        },
    });
    const resJson = await res.json();
    const orders = resJson.orders;
    return {
        props: { orders },
    };
}