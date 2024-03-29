import { Button, Card, Image, Input, Spacer, Text, Textarea } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProduct = ({ product: initialProduct }) => {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(initialProduct);
    const [imageSrc, setImageSrc] = useState("");
    const { data: session, status } = useSession();
    const [selectedImage, setSelectedImage] = useState("");

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleOnUpload = (e) => {
        const file = e.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            // setProduct({ ...product, images: [onLoadEvent.target.result] });
            setImageSrc(onLoadEvent.target.result);
        }

        reader.readAsDataURL(e.target.files[0]);
    }


    const handleSubmit = async () => {
        try {
            if (imageSrc) {
                const formData = new FormData()
                formData.append("file", imageSrc)

                formData.append("upload_preset", "ml_default")

                const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
                const resUpload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData
                })

                const dataUpload = await resUpload.json();
                if (dataUpload.error) {
                    toast.error(dataUpload.error.message);
                    return;
                }
                const { public_id, secure_url } = dataUpload;
                const images = [];
                images.push({
                    public_id,
                    url: secure_url
                });

                setProduct({ ...product, images });
            }

            const res = await fetch(`${process.env.SERVER_URL}/product/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + session.accessToken
                },
                body: JSON.stringify(product)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Product updated successfully");
                // router.push("/admin");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <>
            <Card css={{ mw: '420px', p: '20px', minWidth: '450px' }}>
                <Text
                    size={24}
                    weight="bold"
                    css={{
                        as: 'center',
                        mb: '20px',
                    }}
                    aria-label="Edit Product"
                >
                    Edit Product
                </Text>
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Name" aria-label="Name" name="name" label="Name"
                    value={product.name}
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Price" aria-label="Price" name="price" type={"number"} label="Price"
                    value={product.price}
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Input clearable bordered fullWidth color="primary" size="lg"
                    placeholder="In Stock" aria-label="In Stock" name="countInStock" type={"number"} label="In Stock"
                    value={product.countInStock}
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Textarea clearable bordered fullWidth color="primary" size="lg"
                    placeholder="Description" aria-label="Description" name="description" label="Description"
                    value={product.description}
                    onChange={handleChangeInput}
                />
                <Spacer y={1} />
                <Card><Card.Image src={selectedImage ? selectedImage : product.images[0].url} width={'100%'} height={'100%'} /> </Card>
                <Spacer y={1} />
                <Input fullWidth color="primary" size="lg"
                    placeholder="Image" aria-label="Image" name="images" type={"file"} label="Image"
                    onChange={handleOnUpload}
                />
                <Spacer y={1} />
                <Button color="primary" auto css={{}} onPress={handleSubmit}>Edit product</Button>
            </Card>
        </>
    )
};

export async function getServerSideProps(context) {
    const { params } = context;
    const session = await getSession(context);
    if (!session || session.user.role !== "admin") {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    const res = await fetch(`${process.env.SERVER_URL}/products/${params.id}`);
    const resJson = await res.json();

    return {
        props: {
            product: resJson.product
        }
    }
}
export default EditProduct;