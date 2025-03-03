import React from "react";
import BreadCrumb from "../components/BreadCrumb";

const Profile: React.FC = () => {
  return (
    <>
      <BreadCrumb page="Profile" />
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75"></div>
      </div>
      <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
          <img
            src="/material-tailwind-dashboard-react/img/bruce-mars.jpeg"
            alt="bruce-mars"
            className="inline-block relative object-cover object-center w-[74px] h-[74px] rounded-lg shadow-lg shadow-blue-gray-500/40"
          />
          <div>
            <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mb-1">
              Richard Davis
            </h5>
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              CEO / Co-Founder
            </p>
          </div>
        </div>
        <div className="w-96">
          <div className="overflow-hidden block">
            <nav>
              <ul
                role="tablist"
                className="flex relative bg-blue-gray-50/50 bg-opacity-60 rounded-lg p-1 flex-row"
              >
                <li
                  role="tab"
                  className="flex items-center justify-center text-center w-full h-full relative bg-transparent py-1 px-2 text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer"
                  data-value="app"
                >
                  <div className="z-20 text-inherit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-mt-1 mr-2 inline-block h-5 w-5"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"></path>
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"></path>
                    </svg>
                    App
                  </div>
                  <div
                    className="absolute inset-0 z-10 h-full bg-white rounded-md shadow"
                    data-projection-id="62"
                    style={{ opacity: 1 }}
                  ></div>
                </li>
                <li
                  role="tab"
                  className="flex items-center justify-center text-center w-full h-full relative bg-transparent py-1 px-2 text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer"
                  data-value="message"
                >
                  <div className="z-20 text-inherit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-mt-0.5 mr-2 inline-block h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 001.28.53l4.184-4.183a.39.39 0 01.266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0012 2.25zM8.25 8.625a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zm2.625 1.125a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Message
                  </div>
                </li>
                <li
                  role="tab"
                  className="flex items-center justify-center text-center w-full h-full relative bg-transparent py-1 px-2 text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer"
                  data-value="settings"
                >
                  <div className="z-20 text-inherit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="-mt-1 mr-2 inline-block h-5 w-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Settings
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
