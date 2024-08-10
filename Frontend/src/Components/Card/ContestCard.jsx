import axios from "axios";

const ContestCard = ({ title, desc, link }) => {
  const setReminder = async () => {
    let arr = desc.split(",");
    // Date
    let date = arr[0].trim().split("/");
    let month = date[0].split(" ").pop();
    let day = date[1];
    let year = date[2];

    // time
    let time = arr[1].trim().split(":");
    let hour = time[0];
    let minute = time[1];
    let second = time[2].split(" ")[0];
    try {
      await axios.post(
        "http://localhost:5000/schedule/contest",
        {
          day,
          month,
          year,
          hour,
          minute,
          second,
          title,
        },
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      alert("Reminder Scheduled Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105 relative mb-5">
      <h2 className="mb-2 font-bold text-2xl text-gray-600">{title}</h2>
      <p className="text-gray-500">{desc}</p>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <a
          href={link}
          target="_blank"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          Register
        </a>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          onClick={setReminder}
        >
          Remind me
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
