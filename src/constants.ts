import * as v from "valibot";

export const projects = [
    {
        name: "Typescript SQL Generator",
        link: "https://github.com/najskowski/ts-sql-generator",
        description: "Let's you define models and easily write queries for them",
    },
    {
        name: "Rust Books API",
        link: "https://github.com/najskowski/rust-books-api",
        description: "Rurst & Axum API for managing books",
    },
    {
        name: "NFTs marketplace",
        link: "https://github.com/najskowski/nfts",
        description: "Solidity NFTs marketplace smart contract; sell buy and negotiate NFTs",
    },
    {
        name: "Solidity Prediction Market",
        link: "https://github.com/najskowski/prediction-market",
        description: "Solidity smart contract for prediction market like Polymarket or Kalshi",
    },
    {
        name: "Portfolio",
        link: "https://github.com/najskowski/portfolio",
        description: "* this website *",
    },
] as const;

export const contactFormSchema = v.object({
    email: v.pipe(
        v.string(),
        v.nonEmpty("E-mail can't be empty"),
        v.email("Invalid e-mail"),
        v.maxLength(50, "E-mail too long"),
    ),
    message: v.pipe(
        v.string(),
        v.nonEmpty("Message can't be empty"),
        v.maxLength(500, "Message too long"),
    ),
});
