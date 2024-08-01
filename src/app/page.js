"use client";
import Image from "next/image";
import { fetchRandomUser, fetchRandomAvatar } from "./axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [randomUser, setRandomUser] = useState({});
  const [avatarSvgContent, setAvatarSvgContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchRandomUser();
        setRandomUser(userData);

        const avatarData = await fetchRandomAvatar(userData.username);
        const svgData = encodeURIComponent(avatarData);
        const imgSrc = `data:image/svg+xml;charset=utf-8,${svgData}`;
        setAvatarSvgContent(imgSrc);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!randomUser || !avatarSvgContent) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-indigo-500/25">
      <div>
        {/* <h1 className="text-center">User Info</h1> */}
        <div className="relative w-80 h-80 flex flex-col items-center mt-12 rounded-2xl bg-black shadow-2xl shadow-cyan-500/75">
          {/* Image Avatar */}
          <div className="absolute top-[-6rem] flex border border-gray-300 justify-center items-end rounded-2xl w-52 h-44 bg-white shadow-2xl shadow-cyan-500/50">
            <Image
              src={avatarSvgContent || ""}
              alt="user image"
              width={150}
              height={150}
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>

          {/* Content */}
          <div className="pt-24 text-center text-white ">
            <p className="font-bold text-2xl">
              {randomUser.firstname.toUpperCase()} {randomUser.lastname.toUpperCase()}
            </p>
            <p className="text-gray-300 mb-4">{randomUser.username}</p>
            <p className="text-gray-300">{randomUser.email}</p>
            <p className="text-gray-300">{randomUser.ip}</p>
            <p className="text-gray-300">{randomUser.website}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

// "data": [
//         {
//             "id": 1,
//             "uuid": "94d90f34-b9d4-3dfc-a45e-29d6d63b08cd",
//             "firstname": "Spencer",
//             "lastname": "Flatley",
//             "username": "aweimann",
//             "password": "gVpy]sUTzS|T",
//             "email": "vivian41@yahoo.com",
//             "ip": "246.223.41.124",
//             "macAddress": "73:B1:68:36:41:F2",
//             "website": "http://schimmel.com",
//             "image": "http://placeimg.com/640/480/people"
//         }
//     ]
