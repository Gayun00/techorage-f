import Image from "next/image";
import React from "react";
import DefaultThumbnail from "/public/next.svg";

interface Props {
  title: string;
  text: string;
  url: string;
  thumbnail: string;
}

function Article({ title, text, url, thumbnail }: Props) {
  const handleArticleClick = (url: string) => {
    window.open(url);
  };

  return (
    <div
      onClick={() => handleArticleClick(url)}
      key={title}
      className="flex items-center space-x-4 rounded-md border p-4 m-0 cursor-pointer">
      <Image
        src={thumbnail || DefaultThumbnail}
        width={20}
        height={20}
        alt="thumbnail"
      />
      <div className="flex-1 space-y-1 w-1/3">
        <p className="text-sm font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap">
          {title}
        </p>
        <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden whitespace-nowrap">
          {text.slice(50, 100)}
        </p>
      </div>
    </div>
  );
}

export default Article;
