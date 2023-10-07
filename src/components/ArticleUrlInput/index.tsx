"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
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
import { Loader2 } from "lucide-react";

interface Props {
  mutation: UseMutationResult<Response, unknown, string, unknown>;
}

function ArticleUrlInput({ mutation }: Props) {
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
    mutation.mutate(url);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-between space-y-8 space-x-2">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>저장해두고 싶은 아티클의 url을 입력하세요</FormLabel>
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
        <Button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ArticleUrlInput;
