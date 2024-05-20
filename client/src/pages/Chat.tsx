import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { userTypes } from "../types/userTypes";
import ShowChat from "../components/ShowChat";
import axios from "axios";
const Chat = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const navigate = useNavigate();
  const [allUsers, setallUsers] = useState<userTypes[]>([]);
  const [selectedUserId, setselectedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });
  useEffect(() => {
    async function getallUsers() {
      const Base_Url = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${Base_Url}/user/getallUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });
      console.log(response.data);
      setallUsers(response.data.users);
    }
    getallUsers();
  }, []);

  return (
    <div className="h-screen md:flex ">
      <div className="h-12 w-full absolute bottom-0 md:w-[9%] ">
        First Component
      </div>
      <div
        className={`h-full ${
          selectedUserId !== null ? "hidden" : ""
        } px-4 pt-4 md:w-[30%]`}
      >
        <Contacts allUsers={allUsers} setSelectedUserId={setselectedUserId} />
      </div>
      <div
        className={`h-full ${
          selectedUserId === null ? "hidden" : ""
        } md:w-[61%]`}
      >
        {selectedUserId !== null && (
          <ShowChat
            selectedUserId={selectedUserId}
            setSelectedUserId={setselectedUserId}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
