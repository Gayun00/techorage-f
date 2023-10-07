import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { URL } from "../constants";
import { Article, Keyword } from "../types";

const articleQueryKey = {
  all: ["all"],
  article: () => [...articleQueryKey.all, "article"],
  keywords: () => [...articleQueryKey.all, "keywords"],
};

export const useArticleQuery = () => {
  return useQuery({
    queryKey: articleQueryKey.article(),
    queryFn: getArticles,
  });
};

export const useKeywordsQuery = () => {
  return useQuery({
    queryKey: articleQueryKey.keywords(),
    queryFn: getKeywords,
  });
};

export const useSubmitArticleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url: string) => submitArticle(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleQueryKey.all });
    },
  });
};

export const useUpdateArticleKeywordsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((id: string) => updateArticleKeywords(id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: articleQueryKey.keywords() });
    },
  });
};

const updateArticleKeywords = (articleId: string) => {
  return fetch(`${URL.API_SERVER}/articles/${articleId}/keywords`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const submitArticle = (url: string) => {
  return fetch(`${URL.API_SERVER}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
};

const getArticles = (): Promise<Article[]> => {
  return fetch(`${URL.API_SERVER}/articles`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

const getKeywords = (): Promise<Keyword[]> => {
  return fetch(`${URL.API_SERVER}/keywords`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
