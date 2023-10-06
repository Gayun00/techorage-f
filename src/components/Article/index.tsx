// import Image from "next/image";
import React from "react";
// import DefaultThumbnail from "/public/next.svg";
import { useUpdateArticleKeywordsMutation } from "@/app/queries";

interface Props {
  id: string;
  title: string;
  text: string;
  url?: string;
  thumbnail?: string;
  keywords: string[];
}

function Article({ title, text, url, id, keywords, thumbnail }: Props) {
  const articleKeywordsMutation = useUpdateArticleKeywordsMutation();

  const handleArticleClick = () => {
    if (!url) return;
    window.open(url);
  };

  return (
    <>
      {!keywords?.length && (
        <button
          onClick={() => {
            articleKeywordsMutation.mutate(id);
          }}>
          키워드 분석하기
        </button>
      )}
      <div
        onClick={handleArticleClick}
        key={title}
        className={`flex items-center space-x-4 rounded-md border p-4 m-0 ${
          url ? "cursor-pointer" : ""
        }`}>
        {/* <Image
        src={thumbnail || DefaultThumbnail}
        width={20}
        height={20}
        alt="thumbnail"
      /> */}
        <div className="flex-1 space-y-1 w-20">
          <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </p>
          <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
            {text.slice(50, 100)}
          </p>
        </div>
      </div>
    </>
  );
}

export default Article;
