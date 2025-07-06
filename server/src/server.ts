import { app } from "./app.js";
import { config } from "./config/config.js"; //Even though the file is config.ts, TypeScript will resolve it correctly.

app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});