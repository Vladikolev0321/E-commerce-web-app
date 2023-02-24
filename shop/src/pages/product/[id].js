import { addToCart } from "@/store/cart.slice";
import { Col, Container, Row, Text, Grid, Image, Button, Spacer } from "@nextui-org/react"
import Head from "next/head"
import { useContext, useState } from "react"
import { useDispatch } from "react-redux";



const ProductDetails = ({ product }) => {
    // const [tab, setTab] = useState(0);

    // const isActive = (index) => {
    //     if (tab === index) return 'active';
    //     return '';
    // };

    const dispatch = useDispatch();
    
    return (
        <Container>
            <Row>
                <Grid.Container gap={4} justify="center">
                    <Grid xs={12} sm={3}>
                        <Col>
                            <Image src={product.images[0].url} width="100%" height="100%" objectFit="cover" alt={product.images[0].url} />
                            {/* <Row>
                                {product.images.map((image, index) => (
                                    // <Col key={index}>
                                        <Image src={image.url} width="100%" height="100%" objectFit="cover" alt={image.url} />
                                    // </Col>
                                ))}
                            </Row> */}
                        </Col>
                    </Grid>
                    <Grid xs={12} sm={7}>
                        <Col>
                            <Text h3>
                                {product.title}
                            </Text>
                            <Text>${product.price.toFixed(2)}</Text>
                            {
                                product.countInStock > 0 ? <Text color="green">In Stock {product.countInStock}</Text> : <Text color="red">Out of Stock</Text>
                            }
                            <Text >{product.description}</Text>
                            <Spacer y={1} />
                            <Button shadow onPress={() => dispatch(addToCart(product))}>
                                <Text> Buy </Text>
                            </Button>
                        </Col>
                    </Grid>
                </Grid.Container>
            </Row>
        </Container>
    );
};

export async function getServerSideProps({ params: { id } }) {
    const res = await fetch(`http://localhost:3001/products/${id}`);
    const resJson = await res.json();

    return {
        props: {
            product: resJson.product
        }
    }
};


export default ProductDetails