import {
  Connection,
  Keypair,
  SystemProgram,
  PublicKey,
  Commitment,
} from "@solana/web3.js";
import {
  Program,
  Wallet,
  AnchorProvider,
  Address,
  BN,
} from "@coral-xyz/anchor";
import { WbaVault, IDL } from "../programs/wba_vault";
import wallet from "./wallet/wba-wallet.json";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Commitment
const commitment: Commitment = "finalized";

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment,
});

// Create our program
const program = new Program<WbaVault>(IDL, "D51uEDHLbWAxNfodfQDv7qkp8WZtxrhi3uganGbNos7o" as Address, provider);

// Create a random keypair
const vaultState = new PublicKey("6dLjv3nD9Q4LfPp1S3ZthJ57pGbVnTtk8d7d2FNGctHa");

const vaultAuthKeys = [Buffer.from("auth"), vaultState.toBuffer()];
const [vaultAuth, _bump] = PublicKey.findProgramAddressSync(
  vaultAuthKeys,
  program.programId
);

const token_decimals = 1_000_000n;

const mint = new PublicKey("6HUgTG9S3ybExn9ZdbkrPzHh3sPMum3U72zGzfAuPAv5");


  // Execute our enrollment transaction
  (async () => {
    try {
      // Get the token account of the fromWallet address, and if it does not exist, create it
    const ownerAta = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint, 
      keypair.publicKey,
      undefined
  );
  ///Get the token account of the fromWallet address, and if it does not exist, create it
  const vaultAta = await getOrCreateAssociatedTokenAccount(
      connection, 
      keypair, 
      mint, 
      vaultAuth, 
      true
  );
          const signature = await program.methods
    .withdrawSpl(new BN(1_000_000))
    .accounts({
        owner: keypair.publicKey,
        vaultState, 
        vaultAuth,
        systemProgram: SystemProgram.programId,
        ownerAta: ownerAta.address, 
        vaultAta: vaultAta.address,
        tokenMint: mint, 
        tokenProgram: TOKEN_PROGRAM_ID, 
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID
    })
    .signers([
        keypair
    ]).rpc();
    console.log(`Withdraw success! Check out your TX here:\n\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch (e) {
      console.error(`Oops, something went wrong: ${e}`);
    }
  })();
