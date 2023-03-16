import { Button, Card, Container, Image, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const { useRouter } = require("next/router");

const CreateProduct = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [product, setProduct] = useState({});
    const [imageSrc, setImageSrc] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [error, setError] = useState("");

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleOnUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleSubmit = async () => {
        try {
            const formData = new FormData()
            formData.append("file", imageSrc)

            formData.append("upload_preset", "ml_default")

            const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
            const resUpload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await resUpload.json();
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


            const { name, price, countInStock, description } = product;
            if (!name || !price || !countInStock || !description || !images) {
                setError("Please fill in all fields");
                toast.error("Please fill in all fields");
                return;
            }

            const res = await fetch(`${process.env.SERVER_URL}/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.accessToken
                },
                body: JSON.stringify(product)
            });

            const dataRes = await res.json();
            if (res.status === 201) {
                toast.success("Product created successfully");
                router.replace('/');
            } else {
                toast.error(dataRes.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    //TODOL remove
    if (!session) return <></>;
    return <>
        <Head>
            <title>Manage products</title>
        </Head>
        <Container display="flex"
            alignItems="center"
            justify="center"
            css={{ minHeight: '100vh', minWidth: '20vw', maxHeight: '100vh', maxW: '40vw' }}>
            <Card css={{ mw: '420px', p: '20px', minWidth: '300px' }}>
                <Text
                    size={24}
                    weight="bold"
                    css={{
                        as: 'center',
                        mb: '20px',
                    }}
                    aria-label="Create Product"
                >
                    Create Product
                </Text>
                {error && (
                    <Text color="error" css={{ textAlign: 'center', my: '10px' }}>
                        {error}
                    </Text>
                )}
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Name" aria-label="Name" name="name" label="Name"
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Price" aria-label="Price" name="price" type={"number"} label="Price"
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="In Stock" aria-label="In Stock" name="countInStock" type={"number"} label="In Stock"
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Textarea clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Description" aria-label="Description" name="description" label="Description"
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Content" aria-label="Content" name="content" label="Content"
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                {selectedImage && (<Card><Card.Image src={selectedImage} width={'100%'} height={'100%'} /> </Card>)}
                <Spacer y={1} />
                <Input clearable fullWidth color="primary" size="lg"
                    placeholder="Image" aria-label="Image" name="images" type={"file"} label="Image"
                    onChange={handleOnUpload}
                />
                <Spacer y={1} />
                <Button color="primary" css={{}} onPress={handleSubmit}>Create product</Button>
            </Card>
        </Container>
    </>;
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}


export default CreateProduct;