import React from "react";

interface Props {
  date: Date;
}

function DateSeperator({ date }: Props) {
  const articleDate = new Date(date).toDateString();

  return <p className="my-4 text-center text-sm">{articleDate}</p>;
}

export default DateSeperator;
