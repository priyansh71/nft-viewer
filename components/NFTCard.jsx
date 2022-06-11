import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Link,
    Text,
    useClipboard,
    useColorModeValue,
} from "@chakra-ui/react";

const NFTCard = ({ nft }) => {
    const number = nft.id.tokenId
        .toString()
        .substr(2, nft.id.tokenId.toString().length);
    const decimal = parseInt(number, 16);

    const { hasCopied, onCopy } = useClipboard(nft.contract.address);
    const icon = "gray.900";

    return (
        <Center>
            <Flex
                bg="transparent"
                py={20}
                borderRadius={10}
                px={8}
                mx="2"
                w="full"
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    w="sm"
                    mx="auto"
                >
                    <Box
                        bg="gray.100"
                        h="96"
                        w="full"
                        rounded="3xl"
                        shadow="md"
                        bgSize="cover"
                        bgPos="center"
                        style={{
                            backgroundImage: nft.media[0].gateway
                                ? `url(${nft.media[0].gateway})`
                                : null,
                        }}
                    ></Box>

                    <Box
                        w="80%"
                        mt={-6}
                        bg="white"
                        shadow="lg"
                        rounded="lg"
                        overflow="hidden"
                    >
                        {nft.title ? (
                            <Heading
                                py={4}
                                textAlign="center"
                                fontFamily="Didact Gothic"
                                fontSize="xl"
                                bgColor="gray.100"
                                letterSpacing="1px"
                                textTransform="uppercase"
                                fontWeight="bold"
                                color="gray.900"
                            >
                                {nft.title}
                            </Heading>
                        ) : null}

                        <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            flexDir="column"
                            py={4}
                            gap={1}
                            px={3}
                            bg="gray.200"
                        >
                            <Text
                                fontWeight="extrabold"
                                fontFamily="Nunito"
                                fontSize="lg"
                                color="gray.800"
                            >
                                ID :&nbsp;
                                {nft.id.tokenId.substr(
                                    nft.id.tokenId.length - 4
                                )}
                            </Text>

                            <Flex
                                flexDir="row"
                                justifyContent="space-between"
                                my="2"
                            >
                                <Text
                                    fontFamily="Nunito"
                                    letterSpacing="0.5px"
                                    color="gray.800"
                                    fontSize="lg"
                                    mx="4"
                                >
                                    {nft.contract.address.substr(0, 5) +
                                        "..." +
                                        nft.contract.address.substr(
                                            nft.contract.address.length - 4
                                        )}
                                </Text>

                                {!hasCopied ? (
                                    <CopyIcon
                                        onClick={onCopy}
                                        fontSize="2xl"
                                        mx="2"
                                        cursor="pointer"
                                        color={icon}
                                    />
                                ) : (
                                    <CheckIcon
                                        fontSize="2xl"
                                        mx="2"
                                        color={icon}
                                    />
                                )}
                            </Flex>
                            {nft.description ? (
                                <Text
                                    textAlign="center"
                                    my="2"
                                    fontSize="lg"
                                    w="80%"
                                    fontFamily="Nunito"
                                    fontWeight="light"
                                    color="gray.800"
                                >
                                    {nft.description.substr(0, 100)}
                                </Text>
                            ) : null}
                            <Link
                                href={`https://opensea.io/assets/ethereum/${nft.contract.address}/${decimal}`}
                                target="_blank"
                                textDecoration="none"
                            >
                                <Button
                                    bg="blue.700"
                                    fontSize="md"
                                    fontWeight="bold"
                                    color="white"
                                    px={6}
                                    mb="3"
                                    py={1}
                                    rounded="lg"
                                    fontFamily="Quicksand"
                                    textDecoration="none"
                                    _hover={{
                                        bg: "blue.800",
                                        color: "white",
                                    }}
                                    _focus={{
                                        bg: "blue.800",
                                        color: "white",
                                    }}
                                >
                                    View on OpenSea
                                </Button>
                            </Link>

                            <Link
                                href={`https://etherscan.io/token/${nft.contract.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                textDecoration="none"
                            >
                                <Button
                                    bg="black"
                                    fontSize="md"
                                    fontWeight="bold"
                                    color="white"
                                    px={6}
                                    mb="3"
                                    py={1}
                                    rounded="lg"
                                    fontFamily="Quicksand"
                                    textDecoration="none"
                                    _hover={{
                                        bg: "black",
                                    }}
                                    _focus={{
                                        bg: "black",
                                        outline: "none",
                                    }}
                                >
                                    Verify on Etherscan
                                </Button>
                            </Link>
                        </Flex>
                    </Box>
                </Flex>
            </Flex>
        </Center>
    );
};

export default NFTCard;
