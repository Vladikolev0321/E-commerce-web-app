import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isActive = (path) => {
    return router.pathname === path;
  };
  const cart = useSelector(state => state.cart);

  const quantity = 2;
  return (
    <Navbar isBordered variant="floating">
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link} isActive={isActive("/")} href="/">Features</Navbar.Link>
      </Navbar.Content>

      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link}  href="/cart">
          <div style={{ position: "relative" }}>
            <MdShoppingCart size={10} />
            {cart.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "0.8rem",
                  padding: "2px 6px",
                }}
              >
                {cart.length}
              </div>
            )}
          </div>
        </Navbar.Link>
        {session ? (
          <>
            {session.user.role === "admin" && (
              <>
                <Navbar.Link as={Link} isActive={isActive("/create")} href="/create">Admin</Navbar.Link>
                <Navbar.Link as={Link} isActive={isActive("/products-admin")} href="/products-admin">Products</Navbar.Link>
                <Navbar.Link as={Link} isActive={isActive("/orders")} href="/orders">Orders</Navbar.Link>
              </>
            )
            }
            <Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link>
            <Button auto flat onClick={() => { signOut(); }}>Logout</Button>
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
