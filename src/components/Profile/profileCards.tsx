"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EditProfile from "./editProfile";
import axios from "axios";
import { Admin } from "@/types/admin";

const ProfileCards = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [adminData, setAdminData] = useState<Admin>({
    username: '',
    password: '',
    retype_password: '',
    position: '',
    user_role: '',
    profile_image: null,
  });

  // Fetch API data
  const getData = async () => {
    try {
      const response = await axios.get("https://backend-4c5c.onrender.com/api/dashboard/");
      const profileDataFetched = response.data[0];
      setAdminData(profileDataFetched);
    } catch (error) {
      console.error("The error is ", error);
    }
  };

  useEffect(() => {
    getData();
  }, [editProfile]);

  const handleEdit = () => {
    setEditProfile(!editProfile);
  };

  return (
    <>
      {editProfile ? (
        <EditProfile editProfileHandle={handleEdit} adminData={adminData} />
      ) : (
        <>
          <h2 className="font-bold text-lg">Profile</h2>
          <div className="min-h-screen flex justify-center bg-gray-100">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-72">
                <Image
                  src="/images/background/profile_bg.png"
                  alt="Profile background"
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div
                  className="absolute top-2 right-2 cursor-pointer"
                  onClick={handleEdit}
                >
                  <EditIcon className="text-white text-xl" />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="relative w-24 h-24 bg-white rounded-full overflow-hidden border-4 border-white">
                    {adminData.profile_image ? (
                      <Image
                        src={adminData.profile_image} 
                        alt="Profile picture"
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src="/Images/profile_placeholder.png"
                        alt="Profile picture placeholder"
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 text-center mt-14 flex-grow flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold">{adminData.username}</h1>
                <p className="text-gray-600">{adminData.position}</p>
                <div className="mt-4 max-w-2xl mx-auto">
                  <p className="text-gray-600">
                    {adminData.user_role}
                  </p>
                </div>
                <div className="mt-4 flex justify-center space-x-4">
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <FacebookIcon className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <LinkedInIcon className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-gray-700">
                    <YouTubeIcon className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileCards;
