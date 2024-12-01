import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFetchCoverLetters } from "../../redux/coverLetter";
import CoverLetterCard from "./CoverLetterCard";
import OpenModalButton from "../../components/OpenModalButton";
import CreateCoverLetterModal from "../CreateCoverLetterModal";
import "./MyCoverLetters.css";

function MyCoverLetters() {
    const dispatch = useDispatch();
    const coverLetters = useSelector((state) => state.coverLetters.coverLetters);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6; 

    useEffect(() => {
        (async () => {
            const data = await dispatch(thunkFetchCoverLetters(page, limit));
            setTotalPages(Math.ceil(data.total_count / limit)); 
        })();
    }, [dispatch, page]);

    const handleNextPage = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="my-cover-letters-container">
            <header className="page-header">
                <h1>My Cover Letters</h1>
                <OpenModalButton
                    modalComponent={<CreateCoverLetterModal />}
                    buttonText="+ Create A New Cover Letter"
                    className="create-button"
                />
            </header>
            <div className="cover-letters-list">
                {coverLetters.length > 0 ? (
                    coverLetters.map((coverLetter) => (
                        <CoverLetterCard key={coverLetter.id} coverLetter={coverLetter} />
                    ))
                ) : (
                    <p className="no-cover-letters">No Cover Letters Yet</p>
                )}
            </div>
            <div className="pagination-controls">
                <button
                    className="pagination-button"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="page-indicator">
                    Page {page} of {totalPages}
                </span>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default MyCoverLetters;
