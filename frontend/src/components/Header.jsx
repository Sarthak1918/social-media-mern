import { Button, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BsSearch } from "react-icons/bs";


const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const user = useRecoilValue(userAtom)
	return (
		<Flex justifyContent={"space-between"} alignItems={"center"} mt={6} mb='12'>

			{user && <Link to="/">
				<AiFillHome size={24} />
			</Link>
			}
			<Text className="pacifico-regular" fontSize={{ base: "xl", md: "2xl" }}>Reconnect</Text>

			<Flex gap={4} alignItems={"center"}>
				{colorMode === 'light' ? <MoonIcon fontSize={20} onClick={toggleColorMode} /> : <SunIcon fontSize={20}  onClick={toggleColorMode} />}
				{
					user && (
						<>
							<Link to={`/${user?.username}`}>
								<RxAvatar fontSize={22} />
							</Link>
							<Link to={"/search"}>
								<BsSearch size={18} />
							</Link>
							<LogoutBtn />
						</>

					)
				}
			</Flex>

		</Flex>
	);
};

export default Header;