import Card from "../../components/card";
import {
  GetPictures,
  GetPicturesCount,
  GetRovers,
} from "../../core/services/api/nasa";
import { useQuery } from "react-query";
import styles from "./home.module.scss";
import { INasaData } from "../../interfaces/nasa-data";
import { useState } from "react";
import Loader from "../../components/loader";
import Pagination from "../../components/pagination";
import { IOptions } from "../../interfaces/options";

const Home = () => {
  const [rover, setRover] = useState<string>(
    '{"rover": "curiosity", "sol": 1000 }'
  );
  const [pageCount, setPageCount] = useState<number>(); //This is the total number of photos divided by the page size of (25)
  const [currentPage, setCurrentPage] = useState<number>(1); //This is the currentPage page number used to fetch a specific page
  const size = 25; //This is the constant page size given by NASA Open API
  const [roverName, setRoverName] = useState<string>("");

  //Get the list of different based on selection
  const getRover = useQuery(["getRovers"], async () => {
    const data = await GetRovers();
    window.scrollTo(0, 0); //Scroll to top after each page change
    return data;
  });

  //Get all photos to get the total number of photos for pagination
  const getPicturesCount = useQuery(
    ["getPicturesCount", GetPicturesCount],
    async () => {
      const option: IOptions = JSON.parse(rover);
      const data = await GetPicturesCount(option.rover, option.sol);
      setPageCount(Math.floor(data.data.photos.length / size));
    }
  );

  //Get the paginated data going each page using the `currentPage` state
  //it automatically fetching for the new page number provided
  const getPicture = useQuery(["getPictures", currentPage, rover], async () => {
    const data = await GetPictures(currentPage, rover);
    setRoverName(JSON.parse(rover).rover);
    setCurrentPage(1);
    getPicturesCount.refetch();
    window.scrollTo(0, 0); //Scroll to top after each page change
    return data;
  });

  return (
    <main className="container">
      {getPicture.isLoading || getRover.isLoading || getPicture.isFetching ? (
        <Loader />
      ) : (
        <div className={styles.main}>
          <div className={styles.header}>
            <h1>
              <span className="italics">Spacetagram</span>
            </h1>

            <div className={styles.filter}>
              <h5>Rover:</h5>
              <select onChange={(e) => setRover(e.target.value)}>
                {getRover.data?.data.rovers.map((rover: any, index: number) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      rover: rover.name,
                      sol: rover.max_sol,
                      total_pictures: rover.total_photos,
                    })}
                    selected={roverName === rover.name}
                  >
                    {rover.name}
                  </option>
                ))}
              </select>
              <div className={styles.paginate_group}>
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

      <div className={styles.filter}>
        <div className={styles.paginate_group}>
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
    </main>
  );
};

export default Home;
