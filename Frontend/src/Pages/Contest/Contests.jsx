import React, { useState, useEffect } from "react";
import ContestCard from "../../Components/Card/ContestCard";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Contests = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/codeforces/contest/all"
        );

        console.log(response.status);
        if (!response.data) {
          navigate("/login");
        }
        setContests(response.data.reverse());
      } catch (error) {
        console.error("Error fetching contests:");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      {contests.map((contest) => (
        <ContestCard
          link={"https://codeforces.com/contestRegistration/" + contest.id}
          key={contest.id}
          title={contest.name}
          desc={`Scheduled On: ${new Date(
            contest.startTimeSeconds * 1000
          ).toLocaleString()}`}
        />
      ))}
    </div>
  );
};

export default Contests;
