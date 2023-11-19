import React from "react";

interface Props {
  date: Date;
}

function DateSeperator({ date }: Props) {
  const articleDate = new Date(date).toDateString();

  return <p className="mt-4 text-center text-xs">{articleDate}</p>;
}

export default DateSeperator;
