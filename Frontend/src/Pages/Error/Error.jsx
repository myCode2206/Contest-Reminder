import styles from "./Error.module.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className={`${styles.page_404} py-10 bg-white font-serif`}>
      <div className="container mx-auto">
        <div className="row flex justify-center">
          <div className="col-sm-10 text-center">
            <div
              className={`${styles.four_zero_four_bg} bg-center bg-cover h-96`}
            >
              <h1 className="text-center text-6xl">404</h1>
            </div>
            <div className={`${styles.contant_box_404} mt-[-50px]`}>
              <h3 className="text-2xl">Looks like you're lost</h3>
              <p>The page you are looking for is not available!</p>
              <Link
                to="/"
                className={`${styles.link_404} text-white py-2 px-4 bg-green-600 mt-5 inline-block`}
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
