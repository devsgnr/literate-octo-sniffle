import { useContext, useState } from "react";
import { Heart, Maximize } from "react-feather";
import LikeContext from "../../context/likes";
import { INasaData } from "../../interfaces/nasa-data";
import Badge from "../badge";
import MaximizeModal from "../maximize";
import styles from "./card.module.scss";

interface CardProps {
  data: INasaData;
}

const Card = ({ data }: CardProps) => {
  const { likeState, updateLikeState } = useContext(LikeContext);
  const [maximize, setMaximize] = useState<boolean>(false);

  return (
    <div className={styles.card}>
      {maximize ? (
        <MaximizeModal show={() => setMaximize(!maximize)} src={data.img_src} />
      ) : null}
      <div className={styles.image_container}>
        <img
          src={data.img_src}
          alt={`${data.rover.name} - ${data.rover.landing_date}`}
        />
        <button onClick={() => setMaximize(!maximize)}>
          <Maximize size={19} stroke={"white"} />
        </button>
      </div>

      <div className={styles.main_info}>
        <h5>
          Rover: <span className="italics">{data.rover.name}</span>
        </h5>
        <h5>
          Camera: <span className="italics">{data.camera.name}</span>
        </h5>
      </div>

      <div className={styles.further_info}>
        <p className="main">Camera ID: {data.camera.id}</p>
        <p className="main">Full Camera Name: {data.camera.full_name}</p>
        <p className="main">
          Launch Date: {new Date(data.rover.launch_date).toDateString()}
        </p>
        <p className="main">
          Landing Date: {new Date(data.rover.landing_date).toDateString()}
        </p>
        <p className="main">
          Caputered On (Earth Date): {new Date(data.earth_date).toDateString()}
        </p>
      </div>
      <div className={styles.like_and_status}>
        <button onClick={() => updateLikeState(data.id)}>
          <Heart
            className={styles.like_icon}
            size={19}
            fill={
              likeState[likeState.indexOf(data.id)] === data.id
                ? "red"
                : "white"
            }
            stroke={
              likeState[likeState.indexOf(data.id)] === data.id
                ? "red"
                : "black"
            }
          />
        </button>

        <Badge status={data.rover.status}>
          {data.rover.status.toUpperCase()}
        </Badge>
      </div>
    </div>
  );
};

export default Card;
