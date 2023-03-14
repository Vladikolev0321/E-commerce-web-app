const { Navbar, Dropdown, Button } = require("@nextui-org/react");
const { signOut } = require("next-auth/react");
const { default: Link } = require("next/link");

const MobileNavBar = ({ session, isActive }) => {
    return (
        <Navbar.Content showIn={"xs"} variant="highlight-rounded">
            <Dropdown>
                <Navbar.Item>
                    <Dropdown.Button flat
                        light>Menu</Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu
                    aria-label="dropdown menu"
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
                    justifyContent="center"
                >
                    {/* {session ? (
                        <>
                            {session.user.role === "admin" && (
                                <>
                                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/create")} href="/create">Create</Navbar.Link></Dropdown.Item>
                                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/products-admin")} href="/products-admin">Products</Navbar.Link></Dropdown.Item>
                                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/orders")} href="/orders">Orders</Navbar.Link></Dropdown.Item>
                                </>
                            )
                            }
                            <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link></Dropdown.Item>
                            <Dropdown.Item><Navbar.Link><Button flat onClick={() => { signOut(); }}>Logout</Button></Navbar.Link></Dropdown.Item>
                        </>
                    ) : (
                        <>
                            <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/signin")} href="/signin">Login</Navbar.Link></Dropdown.Item>
                            <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/register")} href="/register">Sign Up</Navbar.Link></Dropdown.Item>
                        </>
                    )
                    } */}

                    {session ? 
                        (<>
                         <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link></Dropdown.Item>
                         <Dropdown.Item><Navbar.Link><Button flat onClick={() => { signOut(); }}>Logout</Button></Navbar.Link></Dropdown.Item>
                        </>)
                         : (
                        <>
                            <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/signin")} href="/signin">Login</Navbar.Link></Dropdown.Item>
                            <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/register")} href="/register">Sign Up</Navbar.Link></Dropdown.Item>
                        </>)
                    }

                
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/")} href="/">Home</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/cart")} href="/cart">Cart</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/create")} href="/create">Create</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/products-admin")} href="/products-admin">Products</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/orders")} href="/orders">Orders</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/profile")} href="/profile">Profile</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/signin")} href="/signin">Login</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item><Navbar.Link as={Link} isActive={isActive("/register")} href="/register">Sign Up</Navbar.Link></Dropdown.Item>
                    <Dropdown.Item>
                        <Navbar.Link><Button flat onClick={() => { signOut(); }}>Logout</Button></Navbar.Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar.Content>
    )
}

export default MobileNavBar;