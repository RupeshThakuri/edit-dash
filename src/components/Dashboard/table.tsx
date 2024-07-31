import React from "react";
import Image from "next/image";
import DashMembTableData from "./membersData";

const DashTable = () => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            {DashMembTableData.map((member, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="rounded-full"
                      src={member.img}
                      alt="Jese image"
                      width={20}
                      height={20}
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{member.name}</div>
                      <div className="font-normal text-gray-500">
                        {member.contact}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{member.position}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                      {member.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span>{member.Salary}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashTable;
