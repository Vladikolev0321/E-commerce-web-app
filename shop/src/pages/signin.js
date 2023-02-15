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

const SignIn = () => {
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
          <Row justify="space-between">
            <Checkbox aria-label="Remember me">
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14} aria-label="Forgot password?">Forgot password?</Text>
          </Row>
          <Spacer y={1} />
          <Button aria-label="Sign in">Sign in</Button>
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