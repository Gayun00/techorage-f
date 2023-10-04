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
import EmptyArticle from "@/components/fallbacks/EmptyArticle";
import Keyword from "@/components/badges/Keyword";
import { Loader2 } from "lucide-react";

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

  console.log(keywords.data, "keywords");
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
              className="flex justify-between space-y-8 space-x-2">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      저장해두고 싶은 아티클의 url을 입력하세요
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        placeholder="https://www.example.com/search?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={submitArticleMutation.isLoading}>
                {submitArticleMutation.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>
          </Form>

          <div className="my-4 space-x-2 space-y-2">
            {!keywords.data?.length &&
              "모은 아티클의 공통 키워드를 보여줘요"
                .split(" ")
                .map((keyword, idx) => <Keyword key={idx}>{keyword}</Keyword>)}
            {keywords.data?.map((keywordData, idx) => (
              <Keyword key={idx}>{keywordData.keyword}</Keyword>
            ))}
            <div className="flex items-center text-xs">
              <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              <p>키워드 추출 중...</p>
            </div>
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
