import { ChevronLeft, ChevronRight } from "react-feather";
import styles from "./pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  pageCount: number;
  nextPage: Function;
  previousPage: Function;
}

const Pagination = ({
  currentPage,
  pageCount,
  nextPage,
  previousPage,
}: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <p>
        Page {currentPage} / {pageCount}{" "}
        {/* Displays the current page you're on and the last possible page */}
      </p>
      <button
        disabled={currentPage === 1} //Disable button to prevent user from going below specific page count
        onClick={() => {
          previousPage();
          window.scrollTo(0, 0);
        }}
      >
        <ChevronLeft />
      </button>
      <button
        disabled={currentPage === pageCount} //Disable button to prevent user from going beyond specific page count
        onClick={() => {
          nextPage();
          window.scrollTo(0, 0);
        }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
