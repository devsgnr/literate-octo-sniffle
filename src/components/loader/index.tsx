import styles from "./loader.module.scss";
import NASALogo from "../../assets/img/nasa_logo.png";

const Loader = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.image_container}>
        <img src={NASALogo} alt={"NASA Logo"} />
      </div>
      <p>waiting for NASA...</p>
    </div>
  );
};
export default Loader;
