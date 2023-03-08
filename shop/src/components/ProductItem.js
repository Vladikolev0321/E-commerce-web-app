import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const ProductItem = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        // <Grid xs={12} sm={5}>
            <Card css={{ w: "100%", h: "400px" }}>
                {/* { isHovered &&  */}
                {/* <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                    <Col>
                        <Text h3 color="black">
                            {product.name}
                        </Text>
                        <Text color="black">${product.price.toFixed(2)}</Text>
                        {
                            product.countInStock > 0 ? <Text color="green">In Stock {product.countInStock}</Text> : <Text color="red">Out of Stock</Text>
                        }
                    </Col>
                </Card.Header> */}
                {/* } */}
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={product.images[0].url}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        alt={product.images[0].url}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        css={{
                            transition: "all 0.3s ease",
                            transform: isHovered ? "scale(1.1)" : "scale(1)",
                        }}
                        // css={{
                        //     filter: isHovered ? "blur(10px)" : "none",
                        //     transition: "filter 0.3s ease-in-out",
                        //   }}
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
                            <Text color="#000" b h4>
                                {product.name}
                            </Text>
                            <Text color="#000" size={15}>
                                ${product.price.toFixed(2)}
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
        // </Grid>
    )
}

export default ProductItem