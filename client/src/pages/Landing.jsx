import { Link } from "react-router-dom";
import { Logo } from "../components";

import img from "../assets/images/landing.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Logo />
        </div>
      </nav>

      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Master Your Trades with{" "}
              <span className="text-indigo-600">TradeDiary</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Elevate your trading strategy with TradeDiary - your personal
              trading journal. Log trades, analyze patterns, and gain valuable
              insights to refine your approach and boost your performance.
            </p>
            <div>
              <Link
                to="/register"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 text-lg font-medium inline-block"
              >
                Start Your Trading Journal
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img
              src={img}
              alt="TradeDiary Dashboard"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </main>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Use TradeDiary?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comprehensive Trade Logging
              </h3>
              <p className="text-gray-700">
                Record every detail of your trades, including entry and exit
                points, position sizes, and your rationale. Keep your trading
                history organized and accessible.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Advanced Performance Analytics
              </h3>
              <p className="text-gray-700">
                Visualize your trading performance with intuitive charts and
                graphs. Track your win rate, average gains, and identify your
                most profitable strategies.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Strategy Refinement Insights
              </h3>
              <p className="text-gray-700">
                Gain deep insights into your trading patterns. Identify what
                works and what doesn't, helping you refine your strategies and
                improve your decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Take Control of Your Trading Journey
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12">
            Whether you're a day trader, swing trader, or long-term investor,
            TradeDiary adapts to your style. Start making data-driven decisions
            and watch your trading improve.
          </p>
          <div className="text-center">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-8 py-4 rounded-md hover:bg-indigo-700 transition duration-300 text-xl font-medium inline-block"
            >
              Begin Your TradeDiary Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
