"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  useArticleQuery,
  useKeywordsQuery,
  useSubmitArticleMutation,
} from "./queries";

export default function Home() {
  const articles = useArticleQuery();
  const keywords = useKeywordsQuery();
  const submitArticleMutation = useSubmitArticleMutation();
  const formSchema = z.object({
    url: z.string().refine(
      (value) => {
        const urlRegex =
          /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
        return urlRegex.test(value);
      },
      {
        message: "유효한 URL 형식이어야 합니다.",
      }
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit({ url }: z.infer<typeof formSchema>) {
    submitArticleMutation.mutate(url);
  }

  const handleArticleClick = (url: string) => {
    window.open(url);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Enter url</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>url</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <div className="mb-4">
            {keywords.data?.map((keywordData, idx) => (
              <Badge key={idx}>{keywordData.keyword}</Badge>
            ))}
          </div>
          <CardContent className="grid gap-4 px-0">
            {articles.data?.map((article) => (
              <div
                onClick={() => handleArticleClick(article.url)}
                key={article.title}
                className="flex items-center space-x-4 rounded-md border p-4 m-0 cursor-pointer">
                <Image
                  src={article.thumbnail}
                  width={20}
                  height={20}
                  alt="thumbnail"
                />
                <div className="flex-1 space-y-1 w-1/3">
                  <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
                    {article.title}
                  </p>
                  <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
                    {article.text.slice(50, 100)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </CardContent>
      </Card>
    </main>
  );
}
