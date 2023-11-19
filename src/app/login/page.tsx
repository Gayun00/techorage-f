import { Button } from "@/components/ui/button";
import React from "react";

function index() {
  return (
    <div className="mt-40 flex flex-col gap-y-3 w-1/3">
      <Button>Github</Button>
      <Button>Kakao</Button>
      <Button>Google</Button>
    </div>
  );
}

export default index;
