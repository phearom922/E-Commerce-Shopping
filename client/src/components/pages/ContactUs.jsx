import { toast } from "react-toastify";
import brandLogo from "../../../public/camboshop.png";
import phearom from "../../../public/phearom.png";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";

const ContactUs = () => {
  const handleSubmit = () => {
    e.preventDefault();
    toast.success("Form submitted successfully!");
  };

  return (
    <div>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <div className="flex max-w-7xl items-center justify-center">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left side content */}
            <div className="space-y-1">
              <div className="flex items-center justify-center rounded-lg">
                <div className="h-auto w-60">
                  <img src={brandLogo} alt="logo" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">
                  Get started with{" "}
                  <span className="text-[#9b87f5]">Winden.</span>
                </h1>
                <p className="text-lg text-gray-600">
                  Answer a couple of questions to make sure your business is a
                  good fit.
                </p>
              </div>

              {/* Testimonial */}
              <div className="mt-12">
                <div className="flex items-center space-x-4">
                  <img
                    src={phearom}
                    alt="Ron Phearom"
                    className="h-12 w-12 rounded-full p-0.5 ring-1 ring-gray-500"
                  />
                  <div>
                    <p className="font-semibold">Ron Phearom</p>
                    <p className="text-sm text-gray-600">Founder @ CamboShopping</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 italic">
                  "Was paying a lot in fees with JPM, I like the pricing
                  transparency and feature offerings"
                </p>
              </div>
            </div>

            {/* Right side form */}
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-xl">
              <h2 className="mb-6 text-xl font-semibold">
                Let's start with the basics
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Fist Name"
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Name"
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="ronphearom2540@gmail.com"
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    id="company"
                    placeholder="Camboshopping.co.ltd"
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="(+855)10 255 585"
                    className="w-full rounded-md border border-gray-200 p-2"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-md bg-[#9b87f5] p-3 text-white hover:bg-[#8B5CF6]"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
