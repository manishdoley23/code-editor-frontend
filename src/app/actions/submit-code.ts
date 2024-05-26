"use server";

import { z } from "zod";
import { CodeSubmitSchema } from "../submit-code/page";
import { createClient } from "redis";
import { randomUUID } from "crypto";

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
        client.connect().then(async () => {
            const id = randomUUID();
            const redisBody = {
                problemId: id,
                code: submitedCode.code,
                language: submitedCode.language,
            };
            console.log("redisBody:", redisBody);
            const redisBodyStringified = JSON.stringify(redisBody);
            const res = await client.lPush("problems", redisBodyStringified);
            if (res) {
                return {
                    message: "Success",
                };
            }
        });
        // console.log("    submitedCode:",     submitedCode);
    } catch (error) {
        console.log("err:", error);
        throw new Error("Error");
    }
};
