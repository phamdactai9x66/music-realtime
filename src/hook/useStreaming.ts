import React from "react";
import { getDatabase, ref, onValue } from "firebase/database";

type useStreamingProps = {
  url: string;
  callBack: (data: looseObj) => void;
};

const useStreaming = (props: useStreamingProps) => {
  const { url, callBack } = props || {};

  React.useEffect(() => {
    const starCountRef = ref(getDatabase(), url);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      callBack?.(data);
    });
  }, []);

  return [];
};

export default useStreaming;
