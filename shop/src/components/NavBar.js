import { Navbar, Button, Text, useTheme, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSession, signOut } from "next-auth/react";
import { MdShoppingCart } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isActive = (path) => {
    return router.pathname === path;
  };
  const cart = useSelector(state => state.cart);
  const isDark = useTheme();

  const cartNavlink = () => {
    return <Navbar.Link as={Link} href="/cart">
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
  }

  return (
    <Navbar isBordered={isDark} variant="floating" color="black">
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        <Navbar.Link as={Link} isActive={isActive("/")} href="/">Features</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content hideIn="xs" variant="highlight-rounded">
        {session && session.user.role !== "admin" && cartNavlink()}
        {session ? (
          <>
            {session.user.role === "admin" && (
              <>
                <Dropdown>
                  <Navbar.Item>
                    <Dropdown.Button auto
                      light
                      css={{
                        px: 0,
                        dflex: "center",
                        svg: { pe: "none" },
                      }}
                      ripple={false}>Admin</Dropdown.Button>
                  </Navbar.Item>
                  <Dropdown.Menu
                    aria-label="Admin dropdown"
                    css={{
                      $$dropdownMenuWidth: "100px",
                      $$dropdownItemHeight: "40px",
                      "& .nextui-dropdown-item": {
                        "& .nextui-dropdown-item-content": {
                          w: "100%",
                          fontWeight: "$semibold",
                        },
                      },
                    }}
                  >
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/create")} href="/create">Create</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/products-admin")} href="/products-admin">Products</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/orders")} href="/orders">Orders</Navbar.Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )
            }
            <Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link>
            <Button auto flat onClick={() => { signOut(); }}>Logout</Button>
          </>
        ) : (
          <>
          {cartNavlink()}
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
      <MobileNavBar session={session} isActive={isActive} />

    </Navbar >
  )
};

export default NavBar;
