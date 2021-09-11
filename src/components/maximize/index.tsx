import { Minimize } from "react-feather";
import styles from "./maximize.module.scss";

interface MaximizeModalProp {
  src: string;
  show: Function;
}

const MaximizeModal = ({ src, show }: MaximizeModalProp) => {
  //Displays a maximized view of the image on the cards
  return (
    <>
      <div className={styles.maximize}>
        <div className={["container", styles.image_container].join(" ")}>
          <img src={src} alt={"maximized_nasa_image_from_mars_rover"} />
          <button onClick={() => show()}>
            <Minimize size={19} stroke={"white"} />
          </button>
        </div>
      </div>
    </>
  );
};
export default MaximizeModal;
