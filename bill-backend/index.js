import app from "./app.js";
import { config } from "./src/config/config.js";


app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
})