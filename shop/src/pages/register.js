import Head from "next/head"
import { Card, Spacer, Button, Text, Input, Row, Checkbox, Container, } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ParticleBackground from "@/components/particlesBackground";

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', conf_password: '' });
    const [error, setError] = useState('');
    const { name, email, password, conf_password } = userData;
    const router = useRouter();
    const { data: session, status } = useSession();


    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async () => {
        const errorMsg = validateUserData(name, email, password, conf_password);
        if (errorMsg) {
            setError(errorMsg);
            return;
        }

        if (password !== conf_password) {
            setError('Passwords do not match.');
            return;
        }
        try {
            const res = await fetch(`${process.env.SERVER_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Successfully registered");
                router.replace('/signin');
            } else {
                toast.error(data.message);
            }

        } catch (err) {
            toast.error(err.message);
        }
    };

    const validateUserData = (name, email, password, conf_password) => {
        let errorMsg;
        if (!name || !email || !password || !conf_password) {
            errorMsg = 'Please fill in all fields';
        }

        if (password !== conf_password) {
            errorMsg = 'Passwords do not match';
        }

        if (password.length < 8) {
            errorMsg = 'Password must be at least 8 characters';
        }

        return errorMsg;
    };

    if(status === 'loading') return <div>Loading...</div>
    if(status === 'authenticated') {
        router.replace('/');
        return <div>Redirecting...</div>
    }

    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <ParticleBackground />
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ mw: '420px', p: '20px', minWidth: '300px' }}>
                    <Text
                        size={24}
                        weight="bold"
                        css={{
                            as: 'center',
                            mb: '20px',
                        }}
                        aria-label="Register"
                    >
                        Register
                    </Text>
                    {error && (
                        <Text color="error" css={{ textAlign: 'center', my: '10px' }}>
                            {error}
                        </Text>
                    )}
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Name"
                        aria-label="Name"
                        name="name"
                        onChange={handleChangeInput}
                    />
                    <Spacer y={1} />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        aria-label="Email"
                        name="email"
                        onChange={handleChangeInput}
                    />
                    <Spacer y={1} />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        aria-label="Password"
                        name="password"
                        onChange={handleChangeInput}
                    />
                    <Spacer y={1} />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        name="conf_password"
                        onChange={handleChangeInput}
                    />
                    <Spacer y={1} />
                    <Button
                        aria-label="Register"
                        onPress={handleSubmit}
                    >
                        Register
                    </Button>
                </Card>
            </Container>
        </div>
    )
}
export default Register;