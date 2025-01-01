import paypal from "paypal-rest-sdk";
import dotenv from "dotenv";
dotenv.config();
const { 
    PAYPAL_CLIENT_ID: client_id, 
    PAYPAL_SECRET_KEY: secret_key 
} = process.env;
paypal.configure({
  mode: "sandbox",
  client_id: client_id,
  secret_key: secret_key,
});

export default paypal;
