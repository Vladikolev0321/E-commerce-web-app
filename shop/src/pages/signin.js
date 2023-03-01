import Head from "next/head"
import {
  Card,
  Spacer,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Container,
  Link as NextLink,
} from '@nextui-org/react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useSelector } from "react-redux";

const SignIn = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { name, email, password, conf_password } = userData;
  const orders = useSelector((state) => state.orders);
  const { data: session, status } = useSession();


  const handleSubmit = async () => {
    console.log('submit');
    console.log(userData);
    const errorMsg = validateUserData(userData.email, userData.password);
    if (errorMsg) {
      // TODO: show error message
      console.log(errorMsg);
      return;
    }

    const res = await signIn('credentials', {
      email: userData.email,
      password: userData.password,
      redirect: false,
    });

    if (res.error) {
      console.log(res.error);
      return;
    }

    // const resJson = await res.json();
    

    // console.log("Orders", resJson);
    // orders.setOrders(resJson);




    console.log(res);

  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserData({ ...userData, [name]: value });
  };

  const validateUserData = (email, password) => {
    if (!email || !password) {
      return 'Please fill in all fields';
    }

    return null;
  };

  return (
    <div>
      <Head>
        <title>Sign In</title>
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
            aria-label="Login"
          >
            Login
          </Text>
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
          <Row justify="space-between">
            <Checkbox aria-label="Remember me">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14} aria-label="Forgot password?">Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button aria-label="Sign in" onClick={handleSubmit}>Sign in</Button>
          <Spacer y={1} />
          <Text size={14} css={{ as: 'center' }} aria-label="Don't have an account?">
            Don't have an account?
            {' '}
            <NextLink as={Link} href="/register">Sign up</NextLink>
          </Text>
        </Card>
      </Container>
    </div>
  )
}

export default SignIn