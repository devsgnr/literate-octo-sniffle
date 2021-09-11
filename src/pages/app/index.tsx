import Card from "../../components/card";
import { GetPictures, GetPicturesCount } from "../../core/services/api/nasa";
import { useQuery } from "react-query";
import styles from "./home.module.scss";
import { INasaData } from "../../interfaces/nasa-data";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import Loader from "../../components/loader";

const Home = () => {
  const [pageCount, setPageCount] = useState<number>(); //This is the total number of photos divided by the page size of (25)
  const [currentPage, setCurrentPage] = useState<number>(1); //This is the currentPage page number used to fetch a specific page
  const size = 25; //This is the constant page size given by NASA Open API

  //Get the paginated data going each page using the `currentPage` state
  //it automatically fetching for the new page number provided
  const getPicture = useQuery(["getPictures", currentPage], async () => {
    const data = await GetPictures(currentPage);
    return data;
  });

  //Get all photos to get the total number of photos for pagination
  const getPicturesCount = useQuery(
    ["getPicturesCount", GetPicturesCount],
    async () => {
      const data = await GetPicturesCount();
      setPageCount(Math.floor(data.data.photos.length / size));
    }
  );

  //Scroll to the top when page is reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container">
      {getPicture.isLoading ||
      getPicturesCount.isLoading ||
      getPicture.isFetching ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <h1>
            <span className="italics">Spacetagram</span>
          </h1>
          <div className={styles.grid}>
            {getPicture.data?.data.photos.map(
              (photo: INasaData, index: number) => (
                <Card data={photo} key={index} />
              )
            )}
          </div>
        </div>
      )}
      <div className={styles.pagination}>
        <p>
          Page {currentPage} / {pageCount}{" "}
          {/* Displays the current page you're on and the last possible page */}
        </p>
        <button
          disabled={currentPage === 1} //Disable button to prevent user from going below specific page count
          onClick={() => {
            setCurrentPage(currentPage - 1); //Update currentPage state and scroll to the top
            window.scrollTo(0, 0);
          }}
        >
          <ChevronLeft />
        </button>
        <button
          disabled={currentPage === pageCount} //Disable button to prevent user from going beyond specific page count
          onClick={() => {
            setCurrentPage(currentPage + 1); //Update currentPage state and scroll to the top
            window.scrollTo(0, 0);
          }}
        >
          <ChevronRight />
        </button>
        <div>
          <select
            onChange={(e) => {
              setCurrentPage(Number(e.target.value)); //Update currentPage state and scroll to the top
              window.scrollTo(0, 0);
            }}
          >
            {Array(pageCount)
              .fill("")
              .map((pages: number, index: number) => (
                <option
                  key={index}
                  selected={currentPage === index + 1}
                  value={index + 1}
                >
                  {index + 1}
                </option>
              ))}
          </select>
        </div>
      </div>
    </main>
  );
};

export default Home;
