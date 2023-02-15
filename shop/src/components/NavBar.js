import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import {useRouter} from 'next/router'

const NavBar = () => {
  const router = useRouter();
  const isActive = (path) => {
    return router.pathname === path;
  };
  return (
    <Navbar isBordered variant="floating">
        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          <Navbar.Link as={Link} isActive={isActive("/")} href="/">Features</Navbar.Link>
          <Navbar.Link as={Link} isActive={isActive("/")} href="/cart">Cart</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link as={Link} color="inherit" href="/signin">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="/register">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
  )
};

export default NavBar;
