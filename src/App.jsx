import "./App.css";
import { FaQuestion, FaLink } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { IoTrendingUpOutline } from "react-icons/io5";
import { FaGlobe } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { MdShare } from "react-icons/md";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Serverless API URL (works both locally and on Vercel)
  const API_BASE = "/api/url";

  const handleShorten = async () => {
    if (!longUrl) return alert("Please enter a URL");

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/save`, {
        longUrl,
        alias,
      });

      setShortUrl(res.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert("Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="flex w-full h-[10vh] justify-between items-center px-[3vw] mb-4 sticky top-0">
        {/* Left Logo */}
        <div className="r-logo text-3xl font-extrabold cursor-pointer text-white">
          <h1>TINYURL</h1>
        </div>

        {/* Right Navigation */}
        <div className="l-nav flex justify-between items-center gap-5 mt-2">
          <FaQuestion className="text-white text-[33px] cursor-pointer bg-[#0980A1] p-2 rounded-full" />
          <div className="nav-items flex justify-between items-center text-white font-medium bg-[#087DA8] rounded">
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3 rounded">
              My URLs
            </a>
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3 rounded">
              Plans
            </a>
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3 rounded">
              Blog
            </a>
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3 rounded">
              Features
            </a>
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3 rounded">
              Sign Up
            </a>
            <a href="#" className="hover:bg-[#10BDE5] px-5 py-3  rounded">
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <main className="flex w-full px-[5vw] py-[5vh]">
        {/* Left Section - Form */}
        <div className="left w-[35%] bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 h-[60vh]">
          {!shortUrl ? (
            <>
              {/* Shorten URL Box */}
              <FaLink className="text-black" />
              <h2 className="font-bold text-medium">Shorten a long URL</h2>
              <input
                type="text"
                placeholder="Enter long link here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                className="border rounded px-3 py-2 w-full outline-none"
              />

              {/* Customize link */}
              <FaWandMagicSparkles />
              <h2 className="font-medium text-lg mt-2">Customize your link</h2>
              <div className="flex gap-2">
                <select className="border rounded px-3 py-2 w-1/2 outline-none">
                  <option>tinyurl.com</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="border rounded px-3 py-2 w-1/2 outline-none"
                />
              </div>

              {/* Shorten URL Button */}
              <button
                onClick={handleShorten}
                disabled={loading}
                className="bg-gray-400 text-white py-4 rounded mt-2 cursor-pointer text-lg"
              >
                {loading ? "Shortening..." : "Shorten URL"}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-600 mt-2">
                By clicking Shorten URL, I agree to the{" "}
                <span className="underline">Terms of Service</span>,{" "}
                <span className="underline">Privacy Policy</span> and{" "}
                <span className="underline">Use of Cookies</span>.
              </p>
            </>
          ) : (
            <>
              <h2 className="font-bold text-lg">Your Shortened URL</h2>
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="border rounded px-3 py-2 w-full outline-none bg-gray-100"
              />

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Copy
                </button>
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Open
                </a>
                <button
                  onClick={() => {
                    setShortUrl(""); // reset UI
                    setLongUrl("");
                    setAlias("");
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Shorten Another
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right Section - Content */}
        <div className="right w-[65%] text-white pl-[5vw] flex flex-col gap-6">
          {/* Heading */}
          <h1 className="text-4xl font-bold">The Original URL Shortener</h1>

          {/* Subtext */}
          <p className="text-lg leading-normal font-light">
            <div className="mt-2 mb-5">Create shorter URLs with TinyURL.</div>
            Want more out of your link shortener? Track link analytics, use
            branded domains for fully custom links, and manage your links with
            our paid plans.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-transparent border border-white hover:bg-white hover:text-[#595C5F] transition text-white px-22 py-2 cursor-pointer rounded">
              View Plans
            </button>
            <button className="bg-white text-black px-22 py-2 rounded">
              Create Free Account
            </button>
          </div>

          {/* List */}
          <div className="mt-4 text-lg font-light">TinyURL plans include:</div>
          <ul className=" space-y-2 text-lg">
            <li>
              <IoTrendingUpOutline className="inline mr-2" /> Detailed Link
              Analytics
            </li>
            <li>
              <FaGlobe className="inline mr-2" /> Fully Branded Domains
            </li>
            <li>
              <IoIosLink className="inline mr-2" /> Bulk Short URLs
            </li>
            <li>
              <MdShare className="inline mr-2" /> Link Management Features
            </li>
          </ul>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-2 text-sm flex justify-start items-center gap-4 sticky bottom-0 w-[100%]">
        <div className="mb-2 sm:mb-0">
          <p>&copy; TinyURL LLC. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
        </div>
      </footer>
    </>
  );
};

export default App;
