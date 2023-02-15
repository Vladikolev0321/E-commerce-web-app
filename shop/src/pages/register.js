import Head from "next/head"
import { Card, Spacer, Button, Text, Input, Row, Checkbox, Container, } from '@nextui-org/react';
const Register = () => {
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
                        placeholder="Email"
                        aria-label="Email"
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
                    />
                    <Spacer y={1} />
                    <Button
                        auto
                        fullWidth
                        color="primary"
                        size="large"
                        type="submit"
                        aria-label="Register"
                    >
                        Register
                    </Button>
                </Card>
            </Container>
        </div>
    )
}
export default Register;