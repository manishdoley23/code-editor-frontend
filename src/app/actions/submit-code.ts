"use server";

import { z } from "zod";
import { CodeSubmitSchema } from "../submit-code/page";
import { createClient } from "redis";

const connectToRedis = () => {
    try {
        const client = createClient();
        client.on("error", (err) => {
            console.log(err);
            throw new Error("Redis error");
        });
        return client;
    } catch (error) {
        throw new Error("Redis error");
    }
};

export const submitCode = async (
    submitedCode: z.infer<typeof CodeSubmitSchema>
) => {
    try {
        const client = connectToRedis();
        // await client.lPush();
    } catch (error) {
        throw new Error("Error");
    }
};
