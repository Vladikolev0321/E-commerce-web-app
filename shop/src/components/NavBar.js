import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isActive = (path) => {
    return router.pathname === path;
  };
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link} isActive={isActive("/")} href="/">Features</Navbar.Link>
      </Navbar.Content>

      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        {session ? (
          <>
            <Navbar.Link as={Link} isActive={isActive("/cart")} href="/cart">Cart</Navbar.Link>
            {session.user.role === "admin" && (
              <>
              <Navbar.Link as={Link} isActive={isActive("/create")} href="/create">Admin</Navbar.Link>
              <Navbar.Link as={Link} isActive={isActive("/products-admin")} href="/products-admin">Products</Navbar.Link>
              </>
              )
            }
            <Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link>
            <Button auto flat onClick={signOut}>Logout</Button>
          </>
        ) : (
          <>
            <Navbar.Link as={Link} color="inherit" href="/signin">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/register">
                Sign Up
              </Button>
            </Navbar.Item>
          </>
        )}

      </Navbar.Content>
    </Navbar >
  )
};

export default NavBar;
