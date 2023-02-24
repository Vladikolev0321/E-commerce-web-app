import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import Link from "next/link";

const ProductItem = ({ product }) => {
    return (
        <Grid xs={12} sm={5}>
            <Card css={{ w: "100%", h: "400px" }}>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text h3 color="black">
                            {product.title}
                        </Text>
                        <Text color="black">${product.price.toFixed(2)}</Text>
                        {
                            product.countInStock > 0 ? <Text color="green">In Stock {product.countInStock}</Text> : <Text color="red">Out of Stock</Text>
                        }
                    </Col>
                </Card.Header>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={product.images[0].url}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        alt={product.images[0].url}
                    />
                </Card.Body>
                <Card.Footer
                    isBlurred
                    css={{
                        position: "absolute",
                        bgBlur: "#ffffff66",
                        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <Row>
                        <Col>
                            <Text color="#000" size={12}>
                                {product.description}
                            </Text>
                        </Col>

                        <Col>
                            <Row justify="flex-end">
                                <Button as={Link} href={`/product/${product._id}`} flat auto rounded color="secondary">
                                    <Text
                                        css={{ color: "inherit" }}
                                        size={12}
                                        weight="bold"
                                        transform="uppercase"
                                    >
                                        View
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}

export default ProductItem