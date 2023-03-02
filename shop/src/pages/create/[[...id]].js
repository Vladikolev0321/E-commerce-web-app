import { Button, Container, Input, Spacer } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";

const { useRouter } = require("next/router");
// const cloudinary = require("cloudinary").v2;

const CreateProduct = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState({});
    //
    const [imageSrc, setImageSrc] = useState("");
    const [uploadData, setUploadData] = useState(undefined);
    const [error, setError] = useState("");

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    function handleOnUpload(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    const handleSubmit = async () => {
        try {
            if (id) {
                // update product
            } else {
                // create product
                const formData = new FormData()
                console.log("product.images[0]:", imageSrc)
                formData.append("file", imageSrc)

                formData.append("upload_preset", "ml_default")

                const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
                console.log("cloudName:", cloudName);
                const resUpload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData
                })

                const data = await resUpload.json();
                console.log("data:", data);
                if (data.error) {
                    toast.error(data.error.message);
                    return;
                }
                const { public_id, secure_url } = data;
                const images = [];
                images.push({
                    public_id,
                    url: secure_url
                });

                setProduct({ ...product, images });
                console.log("product:", product);

                const { name, price, countInStock, description } = product;
                if (!name || !price || !countInStock || !description || !images) {
                    toast.error("Please fill in all fields");
                    return;
                }


                const res = await fetch(`http://localhost:3001/product`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + session.accessToken
                    },
                    body: JSON.stringify(product)
                });

                const dataRes = await res.json();
                console.log("dataRes:", dataRes);
                if (res.status === 201){
                    toast.success("Product created successfully");
                    router.replace('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (!session) return <></>;
    return <>
        <Head>
            <title>Manage products</title>
        </Head>
        <h1>Create Product {id}</h1>
        <Container display="flex"
            alignItems="center"
            justify="center"
            css={{ minHeight: '100vh', minWidth: '20vw', maxHeight: '100vh', maxW: '40vw' }}>
            {error && (
                <Text color="error" css={{ textAlign: 'center', my: '10px' }}>
                    {error}
                </Text>
            )}
            <Input clearable bordered fullWidth color="primary" size="lg"
                placeholder="Name" aria-label="Name" name="name"
                onChange={handleChangeInput}
            />
            <Input clearable bordered fullWidth color="primary" size="lg"
                placeholder="Price" aria-label="Price" name="price" type={"number"}
                onChange={handleChangeInput}
            />
            <Input clearable bordered fullWidth color="primary" size="lg"
                placeholder="In Stock" aria-label="In Stock" name="countInStock" type={"number"}
                onChange={handleChangeInput}
            />
            <Input clearable bordered fullWidth color="primary" size="lg"
                placeholder="Description" aria-label="Description" name="description"
                onChange={handleChangeInput}
            />
            <Input clearable bordered fullWidth color="primary" size="lg"
                placeholder="Content" aria-label="Content" name="content"
                onChange={handleChangeInput}
            />
            <Input clearable fullWidth color="primary" size="lg"
                placeholder="Image" aria-label="Image" name="images" type={"file"}
                onChange={handleOnUpload}
            />
            <Spacer y={1} />
            <Button color="primary" css={{}} onPress={handleSubmit}>Create product</Button>
        </Container>
    </>;
}

// TODO: Add check for logged in user and is admin
// export async function getStaticSide

export default CreateProduct;