import { useEffect } from "react";


const useTitle = title => {
  useEffect(() => {
    window.document.title = `${title} - ReBooks`;
  }, [title])
};

export default useTitle;