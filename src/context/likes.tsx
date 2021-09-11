import { createContext, FC, ReactChild, useEffect, useState } from "react";

const initState = {
  likeState: [] as number[],
  updateLikeState: (value: number) => {},
};

const LikeContext = createContext(initState);
export const LikeProvider = LikeContext.Provider;

type Props = {
  children?: ReactChild | ReactChild[];
};

export const LikeProviderContainer: FC<Props> = ({ children }) => {
  const [likeState, setLikeState] = useState<number[]>(initState.likeState);

  useEffect(() => {
    let storedLikes = localStorage.getItem("like_ids");
    //Checks if the localStorage exists, if yes, set state with the localStorage and if no
    //creates a new one (for new users)
    if (typeof storedLikes === "string") {
      setLikeState(JSON.parse(storedLikes));
    } else {
      localStorage.setItem("like_ids", JSON.stringify([]));
    }
  }, []);

  const updateLikeState = (value: number) => {
    const index = likeState.indexOf(value);
    //Checks to see if a photo id exists at an index and makes a swallow copy of the existing array and
    //and replaces that array with the array that has said photo id removed
    //saves to localStorage and then saves to sets state
    if (index !== -1) {
      localStorage.setItem(
        "like_ids",
        JSON.stringify([
          ...likeState.slice(0, index),
          ...likeState.slice(index + 1),
        ])
      );
      setLikeState([
        ...likeState.slice(0, index),
        ...likeState.slice(index + 1),
      ]);
    } else {
      localStorage.setItem("like_ids", JSON.stringify([...likeState, value]));
      setLikeState((likeState) => [...likeState, value]);
    }
  };

  return (
    <LikeProvider
      value={{
        likeState,
        updateLikeState,
      }}
    >
      {children}
    </LikeProvider>
  );
};

export default LikeContext;
