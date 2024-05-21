import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
