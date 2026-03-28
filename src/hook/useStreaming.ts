import { useEffect } from 'react';

import { getDatabase, onValue, ref } from 'firebase/database';

type useStreamingProps = {
  url: string;
  callBack: (data: looseObj) => void;
};

const useStreaming = (props: useStreamingProps) => {
  const { url, callBack } = props || {};

  useEffect(() => {
    const starCountRef = ref(getDatabase(), url);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val() || {};

      if (snapshot.key) {
        data['_id'] = snapshot.key;
      }

      callBack?.(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [];
};

export default useStreaming;
