import React, { useEffect } from "react";

function Page(props) {
  useEffect(() => {
    document.title = `${props.title} | RecipePro`;
    window.scrollTo(0, 0);
  }, []);

  return <>{props.children}</>;
}

export default Page;
