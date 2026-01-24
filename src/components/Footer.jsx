import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-40 w-full px-6 md:px-16 lg:px-36 text-gray-300">
      <div className="mx-auto max-w-7xl border-b border-gray-500/50 pb-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Left */}
          <div className="max-w-md">
            <Link to="#" className="max-md:flex-1">
              <h1
                className="
    relative inline-block text-3xl
    after:absolute after:left-0 after:-bottom-1
    after:h-0.5 after:w-full
    after:origin-left after:scale-x-0
    after:bg-linear-to-r after:from-primary after:to-white
    after:transition-transform after:duration-300
    hover:after:scale-x-100
  "
              >
                <span className="text-primary">Q</span>uietMovie
              </h1>
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <img
                src={assets.googlePlay}
                alt="Get it on Google Play"
                className="h-10 w-auto cursor-pointer opacity-90 hover:opacity-100 transition"
              />
              <img
                src={assets.appStore}
                alt="Download on the App Store"
                className="h-10 w-auto cursor-pointer opacity-90 hover:opacity-100 transition"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 md:gap-24 md:justify-end flex-1">
            <div>
              <h2 className="font-semibold mb-4 text-white">Company</h2>
              <ul className="text-sm space-y-2 text-gray-400">
                <li>
                  <a className="hover:text-white transition" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    About us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Contact us
                  </a>
                </li>
                <li>
                  <a className="hover:text-white transition" href="#">
                    Privacy policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold mb-4 text-white">Get in touch</h2>
              <div className="text-sm space-y-2 text-gray-400">
                <p>+47 99072107</p>
                <p>klevis25sfj@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-7xl py-5 text-center text-sm text-gray-400">
        Copyright {new Date().getFullYear()} ©{" "}
        <a
          className="text-gray-300 hover:text-white transition"
          href="https://prebuiltui.com"
          target="_blank"
          rel="noreferrer"
        >
          HonoredCodePrince
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
