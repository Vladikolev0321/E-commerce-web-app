import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
// import { Card, Text } from '@nextui-org/react'
import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import { useState } from 'react';
import ProductItem from '@/components/ProductItem';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const [products, setProducts] = useState(props.products);
  console.log("products", products);
  return (
    <>
      <Head>
        <title>Shop app</title>
      </Head>
      <h1>Products</h1>
      <Grid.Container gap={4} justify="flex-start"  >

        {
          products.length === 0 ? <h2>No Products</h2> :
            products.map(product =>
            (

              <Grid key={product._id} xs={10} sm={3}>
                <ProductItem key={product._id} product={product} />
              </Grid>
            ))
        }
      </Grid.Container>
    </>
  )
}


export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/products`);
  const resJson = await res.json();
  const products = resJson.products;
  console.log("products", products);
  return {
    props: { products },
  };
}
