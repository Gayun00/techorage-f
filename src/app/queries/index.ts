import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { URL } from "../constants";
import { Article } from "../types";

const articleQueryKey = {
  all: ["article"],
};

const keywordsQueryKey = {
  all: ["keywords"],
};

export const useArticleQuery = () => {
  return useQuery({
    queryKey: articleQueryKey.all,
    queryFn: getArticles,
  });
};

export const useSubmitArticleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (url: string) => submitArticle(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

const submitArticle = (url: string) => {
  return fetch(`${URL.API_SERVER}/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  })
    .then((res) => res.json())
    .then((data) => console.log("data", data));
};

const getArticles = (): Promise<Article[]> => {
  return fetch(`${URL.API_SERVER}/articles`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data.articles);
};
