import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter the admin password to hash: ", async (password) => {
  if (!password) {
    console.error("No password entered.");
    rl.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  console.log("\nAdd this line to Backend/.env:\n");
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
  rl.close();
});
