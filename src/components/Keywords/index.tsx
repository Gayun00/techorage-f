import React from "react";
import Keyword from "@/components/badges/Keyword";
import { Keyword as KeywordType } from "@/app/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  keywords: KeywordType[];
}

function Keywords({ keywords }: Props) {
  return (
    <div className="my-4 space-x-2 space-y-2">
      {!keywords?.length &&
        "모은 아티클의 공통 키워드를 보여줘요"
          .split(" ")
          .map((keyword, idx) => <Keyword key={idx}>{keyword}</Keyword>)}

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          {keywords?.slice(0, 5).map((keywordData, idx) => (
            <Keyword key={idx}>{keywordData.keyword}</Keyword>
          ))}
          <AccordionContent>
            {keywords?.slice(5, keywords.length).map((keywordData, idx) => (
              <Keyword key={idx}>{keywordData.keyword}</Keyword>
            ))}
          </AccordionContent>
          <AccordionTrigger className="text-xs">키워드 더보기</AccordionTrigger>
        </AccordionItem>
      </Accordion>
      {/* 키워드 추출 중에만 표시 */}
      {/* <div className="flex items-center text-xs">
    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
    <p>키워드 추출 중...</p>
  </div> */}
    </div>
  );
}

export default Keywords;
