import {
    Button,
    Center,
    Checkbox,
    Flex,
    FormLabel,
    Grid,
    Heading,
    Input,
    useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Header";
import NFTCard from "../components/NFTCard";

export default function Home() {
    const heading = useColorModeValue("purple.900", "purple.100");

    const [walletAddress, setWalletAddress] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([]);
    const [fetchForCollection, setFetchForCollection] = useState(false);
    const [currentStart, setCurrentStart] = useState(0);
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    const fetchNFTs = async () => {
        let nfts;
        const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTs/`;

        if (!collectionAddress.length) {
            var requestOptions = {
                method: "GET",
            };
            const fetchURL = `${baseURL}?owner=${walletAddress}`;

            nfts = await fetch(fetchURL, requestOptions).then((response) =>
                response.json()
            );
        } else {
            if(walletAddress === ""){
                setFetchForCollection(true);
                returnAllNFTs()
            }
            else{

                var requestOptions = {
                    method: "GET",
                };
                console.log("Filtering by collection...");

                const fetchURL = `${baseURL}?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`;

                nfts = await fetch(fetchURL, requestOptions).then((response) =>
                    response.json()
                );
            }
        }

        if (nfts) {
            setNFTs(nfts.ownedNfts);
        }
    };

    const fetchNFTsforCollection = async () => {
        if (collectionAddress.length) {
            const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${API_KEY}/getNFTsForCollection`;
            var requestOptions = {
                method: "GET",
            };
            const fetchURL = `${baseURL}?contractAddress=${collectionAddress}&withMetadata=${"true"}`;

            const nfts = await fetch(fetchURL, requestOptions).then(
                (response) => response.json()
            );

            if (nfts) {
                setNFTs(nfts.nfts);
            }
        };
    }



    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            overflowX="scroll"
        >
            <Nav />
            <Center m="16" overflowX="hidden">
                <Head>
                    <title>NFT Collection</title>
                </Head>
                <Flex flexDir="column">
                    <FormLabel
                        htmlFor="wallet"
                        fontFamily="Didact Gothic"
                        fontSize="lg"
                    >
                        Wallet address
                    </FormLabel>
                    <Input
                        spellCheck="false"
                        id="wallet"
                        disabled={fetchForCollection}
                        placeholder="Punch it, Chewie!"
                        size="lg"
                        w="50vw"
                        fontFamily="Nunito"
                        color="gray.500"
                        borderColor={useColorModeValue(
                            "purple.800",
                            "purple.100"
                        )}
                        borderWidth="1px"
                        borderRadius="md"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        _hover={{
                            borderColor: useColorModeValue(
                                "purple.700",
                                "purple.200"
                            ),
                        }}
                        _focus={{
                            borderColor: useColorModeValue(
                                "purple.700",
                                "purple.200"
                            ),
                        }}
                        mb="2"
                    />
                    <FormLabel
                        htmlFor="collection"
                        fontFamily="Didact Gothic"
                        fontSize="lg"
                    >
                        Collection address
                    </FormLabel>

                    <Input
                        spellCheck="false"
                        id="collection"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                        placeholder="Have a collection?"
                        size="lg"
                        w="50vw"
                        fontFamily="Nunito"
                        color="gray.500"
                        borderColor={useColorModeValue(
                            "purple.800",
                            "purple.100"
                        )}
                        borderWidth="1px"
                        borderRadius="md"
                        _hover={{
                            borderColor: useColorModeValue(
                                "purple.700",
                                "purple.200"
                            ),
                        }}
                        _focus={{
                            borderColor: useColorModeValue(
                                "purple.700",
                                "purple.200"
                            ),
                        }}
                        mb="4"
                    />
                    <Center>
                        <FormLabel
                            htmlFor="check"
                            color={useColorModeValue("black", "gray.100")}
                            fontFamily="Nunito"
                            fontSize="lg"
                        >
                            Fetch for collection
                        </FormLabel>
                        <Checkbox
                            id="check"
                            w="fit-content"
                            h="fit-content"
                            mr="2"
                            size="lg"
                            colorScheme="purple"
                            borderRadius="100%"
                            borderColor={useColorModeValue(
                                "purple",
                                "pink.100"
                            )}
                            mb="2"
                            checked={fetchForCollection}
                            onChange={(e) =>
                                setFetchForCollection(e.target.checked)
                            }
                            color="purple.500"
                        />
                    </Center>
                    <Center>
                        <Button
                            onClick={() => {
                                if (fetchForCollection) fetchNFTsforCollection();
                                else fetchNFTs();
                            }}
                            size="lg"
                            w="fit-content"
                            px="10"
                            fontSize="xl"
                            py="6"
                            my="2"
                            fontFamily="Didact Gothic"
                            color={useColorModeValue(
                                "purple.900",
                                "purple.100"
                            )}
                            border="1px"
                            borderColor={useColorModeValue(
                                "purple.900",
                                "purple.100"
                            )}
                            borderStyle="solid"
                            backgroundColor="transparent"
                            _hover={{
                                backgroundColor: "purple.50",
                                color: "purple.900",
                            }}
                            _focus={{
                                backgroundColor: "purple.50",
                                color: "purple.900",
                            }}
                            mb="4"
                        >
                            Fetch NFTs
                        </Button>
                    </Center>
                </Flex>
            </Center>
            <Center>
                {NFTs.length ? (
                    <Grid templateColumns="repeat(3, 1fr)" overflow="hidden">
                        {NFTs.map((nft, index) => (
                            <NFTCard key={index} nft={nft} />
                        ))}
                    </Grid>
                ) : (
                    <Heading
                        fontFamily="Didact Gothic"
                        fontSize="3xl"
                        color={heading}
                    >
                        No NFTs to display
                    </Heading>
                )}
            </Center>
        </Flex>
    );
}
