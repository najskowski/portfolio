import * as v from "valibot";

export const projects = [
    {
        name: "NFTs marketplace",
        link: "https://github.com/najskowski/nfts",
        description: "// Lets users buy, sell and negotiate ERC721 tokens. Written in Solidity and tested with Bun and Viem"
    },
    {
        name: "Prediction market",
        link: "https://github.com/najskowski/prediction-market",
        description: "// AMM prediction market like Polymarket"
    },
    {
        name: "ERC20 contract",
        link: "https://github.com/najskowski/erc20",
        description: "// ERC20 token implementation from scratch"
    }
] as const;

export const contactFormSchema = v.object({
    email: v.pipe(
        v.string(),
        v.nonEmpty("E-mail can't be empty"),
        v.email("Invalid e-mail"),
        v.maxLength(50, "E-mail too long")
    ),
    message: v.pipe(
        v.string(),
        v.nonEmpty("Message can't be empty"),
        v.maxLength(500, "Message too long")
    )
});
