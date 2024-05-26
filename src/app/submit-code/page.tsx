"use client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitCode } from "../actions/submit-code";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export const CodeSubmitSchema = z.object({
    // languages: z
    //     .array(z.string())
    //     .min(1, {
    //         message: "Give at least one language to change to",
    //     })
    //     .max(2, {
    //         message: "Max two languages",
    //     }),
    language: z.string(),
    code: z.string().min(1, {
        message: "Type something",
    }),
});

export default function SubmitCode() {
    const [isPending, startTransition] = useTransition();
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [selectLanguage, setSelectLanguage] = useState<string>("");

    const form = useForm<z.infer<typeof CodeSubmitSchema>>({
        resolver: zodResolver(CodeSubmitSchema),
        defaultValues: {
            code: "",
            language: "",
        },
    });
    const { getValues, setValue, trigger } = form;

    // const handleLanguageSubmit = () => {
    //     setSelectedLanguages((prev) => [...prev, selectLanguage]);
    //     setValue("languages", [...getValues("languages"), selectLanguage]);
    //     trigger("languages");
    //     setSelectLanguage("");
    // };
    // const removeLanguageSubmit = (idx: number) => {
    //     const filtered = selectedLanguages.filter((_, i) => idx !== i);
    //     setSelectedLanguages(filtered);
    //     setValue("languages", filtered);
    //     trigger("languages");
    // };

    const onSubmit = (data: z.infer<typeof CodeSubmitSchema>) => {
        console.log("here");
        startTransition(() => {
            submitCode(data);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Form {...form}>
                <form
                    className="space-y-5"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Write your code</FormLabel>
                                <Textarea
                                    disabled={isPending}
                                    rows={10}
                                    className="resize-none"
                                    {...field}
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="languages"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    To which language you need to translate
                                </FormLabel>
                                <div className="flex gap-2">
                                    <Input disabled={isPending} {...field} />
                                    {/* <Button
                                        disabled={isPending}
                                        type="button"
                                        onClick={handleLanguageSubmit}
                                    >
                                        <PlusCircledIcon className="mr-2" /> Add
                                    </Button> */}
                                </div>
                                {/* {selectedLanguages.map((lang, idx) => {
                                    return (
                                        <Badge
                                            className="m-1"
                                            onClick={() =>
                                                removeLanguageSubmit(idx)
                                            }
                                            key={lang}
                                        >
                                            {lang}
                                        </Badge>
                                    );
                                })} */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
