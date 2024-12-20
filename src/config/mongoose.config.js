import { connect } from "mongoose";
export const connectDB = async () => {
  const URL =
    "mongodb+srv://gonza211321:Moises2113.@cluster0.pqohl.mongodb.net/ProjectCoder";
  try {
    await connect(URL);
    console.log("OK Estas conectado");
  } catch (error) {
    console.log(":() No Estas conectado".error.message);
  }
};
