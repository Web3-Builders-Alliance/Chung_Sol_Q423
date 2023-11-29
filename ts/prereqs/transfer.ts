import {
  Transaction,
  SystemProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import wallet from "./dev-wallet.json";

const from = Keypair.fromSecretKey(new Uint8Array(wallet));

const to = new PublicKey("EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m");

const connection = new Connection("https://api.devnet.solana.com");

const sendToWBA = async () => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: LAMPORTS_PER_SOL / 100,
      })
    );
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("confirmed")
    ).blockhash;
    transaction.feePayer = from.publicKey;
    const sign = await sendAndConfirmTransaction(connection, transaction, [
      from,
    ]);
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${sign}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, some thing went wrong: ${e}`);
  }
};

const cleanUpDevWallet = async () => {
  try {
    const balance = await connection.getBalance(from.publicKey);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance,
      })
    );
    transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
    transaction.feePayer = from.publicKey;
    const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;
    transaction.instructions.pop();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: to,
        lamports: balance - fee,
      })
    )
    const sign = await sendAndConfirmTransaction(connection, transaction, [from]);
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${sign}?cluster=devnet`)
  } catch (e) {
    console.error(`Oops, some thing went wrong: ${e}`);
  }
}

cleanUpDevWallet();