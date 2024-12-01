import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchApplicationSummary } from '../../redux/application';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaBriefcase, FaCalendarAlt, FaFileAlt, FaFrown } from 'react-icons/fa'; // Import icons
import './HomePage.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
  const dispatch = useDispatch();
  const summary = useSelector(state => state.applications.summary);
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(sessionUser.username)

  useEffect(() => {
    dispatch(thunkFetchApplicationSummary()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const chartData = {
    labels: ['Applied', 'Interviewed', 'Offered', 'Rejected'],
    datasets: [
      {
        data: [
          summary.applied,
          summary.interviewed,
          summary.offered,
          summary.rejected,
        ],
        backgroundColor: ['#006B8F', '#7F9D9C', '#C0D6D6', '#F4B3B3'], 
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="home-container">
      {isLoaded ? (
        <div className="summary-container">
          <h1>Welcome, {sessionUser.username} </h1>
          <div className="main-content">
            {/* Left Section: Total Applications & Stats */}
            <div className="left-section">
              <div className="total-applications-container">
                <div className="summary-card total-applications">
                  <h2><FaFileAlt /> Total Applications</h2>
                  <p>{summary.total}</p>
                </div>
              </div>

              <div className="stats-container">
                <div className="summary-card">
                  <h2><FaFileAlt /> Applied</h2>
                  <p>{summary.applied}</p>
                </div>
                <div className="summary-card">
                  <h2><FaCalendarAlt /> Interviewed</h2>
                  <p>{summary.interviewed}</p>
                </div>
                <div className="summary-card">
                  <h2><FaBriefcase /> Offered</h2>
                  <p>{summary.offered}</p>
                </div>
                <div className="summary-card">
                  <h2><FaFrown /> Rejected</h2>
                  <p>{summary.rejected}</p>
                </div>
              </div>
            </div>

            {/* Right Section: Pie Chart */}
            <div className="right-section">
              <div className="chart-container">
                <h3>Application Status</h3>
                <Pie data={chartData} />
              </div>
            </div>
          </div>

          {/* Helpful Links Section */}
          <div className='helpful-links'>
            <h3>Some Helpful Links</h3>
            <ul>
              <li><a href="https://hbr.org/2022/05/how-to-write-a-resume-that-will-stand-out">Creating a resume</a></li>
              <li><a href="#">The Job Search</a></li>
              <li><a href="#">Managing Mental Health</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default HomePage;
