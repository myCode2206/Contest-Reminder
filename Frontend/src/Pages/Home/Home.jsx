import React from "react";
import Card from "../../Components/Card/Card";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap mt-7 justify-center">
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3rlYGTkj3mgt6h2-lMnKwncgBRtqmE9lwDw&s"
        title="Codeforces"
        desc="Competitive programming platform; contests, problems, and community for coders worldwide."
        redirect="/codeforces/contest"
      />
      <Card
        img="https://repository-images.githubusercontent.com/408927712/1c5ce46e-266f-43f0-b543-75bf341239b5"
        title="LeetCode"
        desc="LeetCode: Coding platform for practicing algorithm and data structure problems."
        redirect="/leetcode/contest"
      />
      <Card
        img="https://media.geeksforgeeks.org/wp-content/uploads/20210101144014/gfglogo.png"
        title="Codeforces"
        desc="GeeksforGeeks: Platform for coding tutorials, challenges, and job preparation."
        redirect="/geeksforgeeks/contest"
      />
    </div>
  );
};

export default Home;
