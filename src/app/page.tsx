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
import Article from "@/components/Article";
import EmptyArticle from "@/components/emptyData/EmptyArticle";

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
            {!keywords.data?.length && (
              <Badge>모은 아티클의 공통 키워드를 보여줘요</Badge>
            )}
            {keywords.data?.map((keywordData, idx) => (
              <Badge key={idx}>{keywordData.keyword}</Badge>
            ))}
          </div>
          <CardContent className="grid gap-4 px-0">
            {!articles.data?.length && <EmptyArticle />}
            {articles.data?.map((article, idx) => (
              <Article
                key={idx}
                title={article.title}
                text={article.text}
                url={article.url}
                thumbnail={article.thumbnail}
              />
            ))}
          </CardContent>
        </CardContent>
      </Card>
    </main>
  );
}
