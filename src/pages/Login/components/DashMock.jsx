import {
  LuBox,
  LuLayoutDashboard,
  LuBuilding2,
  LuSettings,
} from "react-icons/lu";
import * as motion from "motion/react-client";
import { GoCheckCircleFill } from "react-icons/go";

import {
  LiaAccessibleIcon,
  LiaAngleUpSolid,
  LiaFileUploadSolid,
} from "react-icons/lia";
const CHART_BARS = [8, 6, 9, 5, 6];
const CHART_LABEL = ["Jan", "Feb", "Mar", "April", "May"];

const icons = [
  {
    id: 1,
    element: <LuLayoutDashboard size={24} />,
  },
  {
    id: 2,
    element: <LuBuilding2 size={20} />,
  },
  {
    id: 3,
    element: <LuSettings size={20} />,
  },
  {
    id: 4,
    element: <LuBox size={20} />,
  },
  {
    id: 5,
    element: <LiaAngleUpSolid size={20} />,
  },
  {
    id: 6,
    element: <LiaFileUploadSolid size={20} />,
  },
  {
    id: 7,
    element: <LiaAccessibleIcon size={20} />,
  },
];

export default function DashMock() {
  const mockSidebarItemBase =
    "flex items-center gap-1.5 px-2 py-1.5 rounded-md text-text-secondary";
  const mockSidebarItemActive = "bg-primary-light text-primary-text";

  return (
    <div className="relative hidden flex-[0.4] sm:flex flex-col justify-between gap-8 px-14 py-10 text-white bg-red-300  z-5 w-full">
      <div className="relative h-full flex items-center justify-center  bg-white">
        <motion.div
          className="
                w-[40rem] flex h-[30rem] absolute left-[5rem] bg-white rounded-2xl shadow-2xl p-2
                [transform-style:preserve-3d]
              "
          initial={{
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 1,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: -6,
            rotateY: -18,
          }}
        >
          <motion.div
            className="max-w-[300px] flex flex-col gap-3 px-3 py-6 absolute left-[33rem] top-[100px] bg-red-300 z-10 rounded-2xl bg-white shadow-md "
            initial={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 1,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <motion.div
              className="w-full flex gap-2 items-center justify-start"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <GoCheckCircleFill size={34} className="text-red-300" />
              <span className="text-black text-[10px] whitespace-nowrap">
                Create tenants
              </span>
            </motion.div>
            <motion.div
              className="w-full flex gap-2 items-center justify-start"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GoCheckCircleFill size={24} className="text-red-300" />
              <span className="text-black text-[10px] whitespace-nowrap">
                Manage tenants
              </span>
            </motion.div>
            <motion.div
              className="w-full flex gap-2 items-center justify-start"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GoCheckCircleFill size={19} className="text-red-300" />
              <span className="text-black text-[10px] whitespace-nowrap">
                Track tenants
              </span>
            </motion.div>
          </motion.div>
          <div className="w-full flex bg-yellow-300 [perspective:1200px]">
            <div className="w-fit bg-white-100 h-full rounded-2xl py-4 px-4 flex flex-col justify-center items-center gap-6">
              {icons.map((item) => (
                <motion.div
                  className={`${mockSidebarItemBase} ${item?.id === 1 ? `${mockSidebarItemActive}` : ""}`}
                  key={item?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: item.id % 10 }}
                >
                  {item?.element}
                </motion.div>
              ))}
            </div>
            <div className="flex-1 px-5 py-[18px] flex flex-col gap-4">
              <div className="w-full flex flex-col gap-1">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[20px] text-black font-bold"
                >
                  Dashboard
                </motion.h2>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[16px] text-gray-500"
                >
                  Manage your tenants in one place
                </motion.span>
              </div>
              <span className="block w-[90px] h-[20px] rounded bg-[#dde6f3]" />
              <div className="flex gap-2.5 justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light-hover"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light"
                />
              </div>
              <div className="flex gap-2.5 justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="flex-1 h-[34px] rounded-lg bg-primary-light-hover"
                />
              </div>
              <div className="flex w-full gap-8 justify-between items-end flex-1 bg-blue-300">
                <div className="w-[60%] flex flex-col gap-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full flex flex-col justify-center items-start bg-red-400 text-white px-2 rounded"
                  >
                    <p className="text-[12px]">Zaggle Pvt Limited</p>
                    <p className="text-[10px]">Joined 3 months ago</p>
                  </motion.div>
                  <hr className="text-gray-200" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full flex flex-col justify-center items-start text-gray-600 px-2 rounded"
                  >
                    <p className="text-[12px]">Dice Pvt Limited</p>
                    <p className="text-[10px]">Joined 2 months ago</p>
                  </motion.div>
                  <hr className="text-gray-200" />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full flex flex-col justify-center items-start text-gray-600 px-2 rounded"
                  >
                    <p className="text-[12px]">Paypal Pvt Limited</p>
                    <p className="text-[10px]">Joined 3 months ago</p>
                  </motion.div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex items-end justify-center w-full gap-4">
                    {CHART_BARS.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 rounded bg-[linear-gradient(180deg,#a99bfb,#6d5ef7)] max-w-fit px-2 relative"

                        initial={{ opacity: 0, height: "0px" }}
                        animate={{ opacity: 1, height: `${h}rem` }}
                        transition={{ duration: 1 }}
                      >
                        <span className="aboslute text-[10px]">
                          {CHART_LABEL[i]}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-400 font-bold text-[12px] w-full text-center">
                    Usage per month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
