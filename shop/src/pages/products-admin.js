import ProductItem from "@/components/ProductItem";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const { Grid, Table, Button, Row, Spacer, Image, Modal, Card } = require("@nextui-org/react");

const ProductsAdmin = ({ products }) => {
    const [allProducts, setAllProducts] = useState(products);
    const {data: session, status} = useSession();
    const [visible, setVisible] = useState(false);
    const [currId, setId] = useState("");

    const handler = (id) => {
        setVisible(true);
        setId(id);
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const deleteProduct = async () => {
        const res = await fetch(`${process.env.SERVER_URL}/product/${currId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + session.accessToken
            }
        });

        const resJson = await res.json();
        if(res.ok){
            toast.success("Deleted product");
            products = products.filter(product => product._id !== currId);
            setAllProducts(products);

        } else {
            toast.error(resJson.message);
        }
        setVisible(false);
    };

    return (
        <>
            <h1>Products</h1>
            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Body>
                    <Row justify="space-between">
                        Are you sure you want to delete that?
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={deleteProduct}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            { allProducts.length === 0 ? <h2>No products</h2> : (
            <Table
                aria-label="cart table"
                css={{
                    height: "auto",
                    minWidth: "100%",
                    width: 900,
                }}>
                <Table.Header>
                    <Table.Column></Table.Column>
                    <Table.Column>NAME</Table.Column>
                    <Table.Column>UNIT SOLD</Table.Column>
                    <Table.Column>IN STOCK</Table.Column>
                    <Table.Column>PRICE</Table.Column>
                    <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body>
                    {
                            allProducts.map(product =>
                            (
                                <Table.Row key={product._id}>
                                    <Table.Cell><Card css={{maxWidth:200, maxHeight: 150}}><Card.Image width={'100%'} height={'100%'} src={product.images[0].url} /></Card></Table.Cell>
                                    <Table.Cell>{product.name}</Table.Cell>
                                    <Table.Cell>{product.sold}</Table.Cell>
                                    <Table.Cell>{product.countInStock}</Table.Cell>
                                    <Table.Cell>${product.price}</Table.Cell>
                                    <Table.Cell>
                                        <Row>
                                            <Button auto flat as={Link} href={`/edit/${product._id}`}>Edit</Button>
                                            <Spacer x={0.5} />
                                            <Button onPress={() => handler(product._id)} color={"error"} auto >Delete</Button>
                                        </Row>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                    }
                </Table.Body>
            </Table>
            )}
        </>


    );
}

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

    const res = await fetch(`${process.env.SERVER_URL}/products`);
    const resJson = await res.json();
    const products = resJson.products;
    return {
        props: { products },
    };
}

export default ProductsAdmin;