import { Flex, Text, useColorMode, IconButton, Menu, MenuButton, MenuList, MenuItem, Box, LightMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { BsSearch } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";



const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom);

	return (
		<Flex
			justifyContent="space-between"
			alignItems="center"
			mb="8"
			py={3}
			px={1}
			position="sticky" // Add this line
            top="0" // Add this line
            zIndex="sticky" // Add this line
			bg={colorMode==='light'?"white":"dark"}
		>
			{/* Logo */}
			{colorMode === 'light' ? <MoonIcon fontSize={20} onClick={toggleColorMode} cursor="pointer" /> : <SunIcon fontSize={20} onClick={toggleColorMode} cursor="pointer" />}
			<Link to={"/"}>
			<Text className="pacifico-regular" fontSize="2xl">
				Reconnect
			</Text>
			</Link>

			{/* Menu - Only visible on mobile screens */}
			<Box display={{ base: "block", md: "none" }}>
				<Menu>
					<MenuButton
						as={IconButton}
						aria-label="Options"
						icon={<HamburgerIcon />}
						variant="outline"
						size="sm"
					/>
					<MenuList>
						<MenuItem icon={<RxAvatar size={22} />}>
							<Link to={`/${user?.username}`}>
								Your Profile
							</Link>
						</MenuItem>
						<MenuItem icon={<BsSearch size={18} />}>
							<Link to={"/search"}>
								Search User
							</Link>
						</MenuItem>
						<MenuItem>
							<LogoutBtn  text={"Logout"}/>
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>

			{/* User Links */}
			<Flex gap={4} alignItems="center" display={{ base: "none", md: "flex" }}>
				{user && (
					<>
						<Link to={`/${user?.username}`}>
							<RxAvatar fontSize={22} />
						</Link>
						<Link to={"/search"}>
							<BsSearch size={18} />
						</Link>
						<LogoutBtn />
					</>
				)}
			</Flex>
		</Flex>
	);
};

export default Header;
