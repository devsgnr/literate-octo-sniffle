import Card from "../../components/card";
import { GetPictures, GetPicturesCount } from "../../core/services/api/nasa";
import { useQuery } from "react-query";
import styles from "./home.module.scss";
import { INasaData } from "../../interfaces/nasa-data";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";

const Home = () => {
  const [pageCount, setPageCount] = useState<number>(); //This is the total number of photos divided by the page size of (25)
  const [currentPage, setCurrentPage] = useState<number>(1); //This is the currentPage page number used to fetch a specific page
  const size = 25; //This is the constant page size given by NASA Open API

  //Get the paginated data going each page using the `currentPage` state
  //it automatically fetching for the new page number provided
  const getPicture = useQuery(["getPictures", currentPage], async () => {
    const data = await GetPictures(currentPage);
    window.scrollTo(0, 0); //Scroll to top after each page change
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

  return (
    <main className="container">
      {getPicture.isLoading ||
      getPicturesCount.isLoading ||
      getPicture.isFetching ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>
              <span className="italics">Spacetagram</span>
            </h1>
            <div className={styles.pagination}>
              <Pagination
                currentPage={currentPage}
                pageCount={pageCount || 1}
                nextPage={() => setCurrentPage(currentPage + 1)}
                previousPage={() => setCurrentPage(currentPage - 1)}
              />
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
          </div>

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
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount || 1}
          nextPage={() => setCurrentPage(currentPage + 1)}
          previousPage={() => setCurrentPage(currentPage - 1)}
        />
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
