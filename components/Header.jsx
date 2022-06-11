import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <>
            <Box
                bg={useColorModeValue("gray.100", "gray.900")}
                px={4}
                w="100vw"
            >
                <Flex
                    h={24}
                    alignItems={"center"}
                    justifyContent="space-evenly"
                >
                    <Heading size="lg" fontFamily="Quicksand">
                        Eth Mainnet NFT Viewer
                    </Heading>

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? (
                                    <MoonIcon fontSize={34} />
                                ) : (
                                    <SunIcon fontSize={34} />
                                )}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
