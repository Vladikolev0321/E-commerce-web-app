import Head from "next/head"
import { Card, Spacer, Button, Text, Input, Row, Checkbox, Container, } from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '', conf_password: '' });
    const [error, setError] = useState('');
    const { name, email, password, conf_password } = userData;

    const handleChangeInput = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async () => {
        console.log(userData);
        const errorMsg = validateUserData(name, email, password, conf_password);
        if(errorMsg){
            console.log(errorMsg);
            return;
        }
        
        if (password !== conf_password) {
            return setError('Passwords do not match.');
        }
        try {
            const res = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.log(err);
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

    return (
        <div>
            <Head>
                <title>Register</title>
            </Head>
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ mw: '420px', p: '20px' }}>
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
                        auto
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        aria-label="Register"
                        onClick={handleSubmit}
                        // onSubmit={handleSubmit}
                    >
                        Register
                    </Button>
                </Card>
            </Container>
        </div>
    )
}
export default Register;