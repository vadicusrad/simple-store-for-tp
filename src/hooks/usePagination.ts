import { setCurrentPage } from '../features/productSlice';
import { useAppDispatch, useAppSelector } from './useReduxHooks';

interface UsePaginationProps {
    contentPerPage: number;
    count: number;
}
interface UsePaginationReturn {
    page: number;
    totalPages: number;
    firstContentIndex: number;
    lastContentIndex: number;
    nextPage: () => void;
    prevPage: () => void;
    setPage: (page: number) => void;
}
type UsePagination = (arg0: UsePaginationProps) => UsePaginationReturn;

const usePagination: UsePagination = ({ contentPerPage, count }) => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.products.currentPage);

    // number of pages in total (total items / content on each page)
    const pageCount = Math.ceil(count / contentPerPage);
    // index of last item of current page
    const lastContentIndex = page * contentPerPage;
    // index of first item of current page
    const firstContentIndex = lastContentIndex - contentPerPage;

    // change page based on direction either front or back
    const changePage = (direction: boolean) => {
        // handleSetPages(direction);
        if (direction) {
            // if page is the last page, do nothing
            if (page === pageCount) {
                return;
            }
            return dispatch(setCurrentPage(page + 1));
            // go back
        } else {
            // if page is the first page, do nothing
            if (page === 1) {
                return;
            }
            // return state - 1;
            return dispatch(setCurrentPage(page - 1));
        }
    };

    const setPageSAFE = (num: number) => {
        // if number is greater than number of pages, set to last page
        if (num > pageCount) {
            dispatch(setCurrentPage(num));
            // if number is less than 1, set page to first page
        } else if (num < 1) {
            dispatch(setCurrentPage(num));
        } else {
            dispatch(setCurrentPage(num));
        }
    };

    return {
        totalPages: pageCount,
        nextPage: () => changePage(true),
        prevPage: () => changePage(false),
        setPage: setPageSAFE,
        firstContentIndex,
        lastContentIndex,
        page,
    };
};

export default usePagination;
