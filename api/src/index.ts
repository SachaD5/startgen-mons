import { env } from "./config.js";
import { createApp } from "./app.js";

createApp().listen(env.PORT, () => {
    console.log(`🚀 API StartGen Mons lancée sur http://localhost:${env.PORT}`);
});
