import { addToCart } from "@/store/cart.slice";
import { Col, Container, Row, Text, Grid, Image, Button, Spacer, Card } from "@nextui-org/react"
import { useSession } from "next-auth/react";
import Head from "next/head"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = ({ product }) => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success("Added to cart");
    };

    return (
        <Container>
            <Row>
                <Grid.Container gap={4} justify="center">
                    <Grid xs={12} sm={4}>
                        <Col>
                            <Card>
                                <Image src={product.images[0].url} width="100%" height="100%" objectFit="cover" alt={product.images[0].url} />
                            </Card>
                        </Col>
                    </Grid>
                    <Grid xs={12} sm={7}>
                        <Col>
                            <Text h3>
                                {product.name}
                            </Text>
                            <Text>${product.price.toFixed(2)}</Text>
                            {
                                product.countInStock > 0 ? <Text color="green">In Stock {product.countInStock}</Text> : <Text color="red">Out of Stock</Text>
                            }
                            <Text >{product.description}</Text>
                            <Spacer y={1} />
                            {session && session.user.role !== "admin" && (
                                <Button color="success" disabled={!(product.countInStock > 0)} shadow onPress={handleAddToCart}>
                                    <Text color="white"> Buy </Text>
                                </Button>)
                            }
                            {!session && (
                                <Button color="success" disabled={!(product.countInStock > 0)} shadow onPress={handleAddToCart}>
                                    <Text color="white"> Buy </Text>
                                </Button>
                            )}
                        </Col>
                    </Grid>
                </Grid.Container>
            </Row>
        </Container>
    );
};

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`${process.env.SERVER_URL}/products/${id}`);
    const resJson = await res.json();

    return {
        props: {
            product: resJson.product
        }
    }
};


export default ProductDetails