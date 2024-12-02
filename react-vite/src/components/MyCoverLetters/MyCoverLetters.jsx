import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { thunkFetchCoverLetters } from "../../redux/coverLetter";
import CoverLetterCard from "./CoverLetterCard";
import OpenModalButton from "../../components/OpenModalButton";
import CreateCoverLetterModal from "../CreateCoverLetterModal";
import "./MyCoverLetters.css";

function MyCoverLetters() {
    const dispatch = useDispatch();
    const coverLetters = useSelector((state) => state.coverLetters.coverLetters);

    const [searchParams, setSearchParams] = useSearchParams();

    const [pagination, setPagination] = useState({
        page: parseInt(searchParams.get("page") || 1),
        totalPages: 1,
    });
    const limit = 6;

    useEffect(() => {
        const queryPage = parseInt(searchParams.get("page") || 1);
        setPagination((prev) => ({ ...prev, page: queryPage }));
    }, [searchParams]);

    useEffect(() => {
        (async () => {
            if (pagination.page === 1 && coverLetters.length > limit) {
                await dispatch(thunkFetchCoverLetters(1, limit));
            } else {
                const data = await dispatch(thunkFetchCoverLetters(pagination.page, limit));
                setPagination((prev) => ({
                    ...prev,
                    totalPages: Math.ceil(data.total_count / limit),
                }));
            }
        })();
    }, [dispatch, pagination.page, coverLetters.length]);

    const handleNextPage = () => {
        if (pagination.page < pagination.totalPages) {
            const nextPage = pagination.page + 1;
            setPagination((prev) => ({ ...prev, page: nextPage }));
            setSearchParams({ page: nextPage });
        }
    };

    const handlePreviousPage = () => {
        if (pagination.page > 1) {
            const prevPage = pagination.page - 1;
            setPagination((prev) => ({ ...prev, page: prevPage }));
            setSearchParams({ page: prevPage });
        }
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
                    disabled={pagination.page === 1}
                >
                    Previous
                </button>
                <span className="page-indicator">
                    Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={pagination.page === pagination.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default MyCoverLetters;
