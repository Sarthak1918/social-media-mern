import { Button, Flex, Image, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
// import { FiLogOut } from "react-icons/fi";
// import { BsFillChatQuoteFill } from "react-icons/bs";
// import { MdOutlineSettings } from "react-icons/md";

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom)
	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb='12'>

			<Link to="/">
				<AiFillHome size={24} />
			</Link>

			<Image
				cursor={"pointer"}
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>
			{
				user && (
					<Flex  gap={3} alignItems={"center"}>
					<Link to={`/${user?.username}`}>
						<RxAvatar size={24} />
					</Link>
					<LogoutBtn/>
					</Flex>
				)
			}

			{
				!user && (
					<Link to={`/auth`}>
						<Button>Login</Button>
					</Link>
				)
			}
			

		</Flex>
	);
};

export default Header;