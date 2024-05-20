import { SetStateAction, useEffect } from "react";
import axios from "axios";

const ShowChat = ({
  selectedUserId,
  setSelectedUserId,
}: {
  selectedUserId: string | null;
  setSelectedUserId: React.Dispatch<SetStateAction<string | null>>;
}) => {
  useEffect(() => {
    async function getUser() {
      const Base_Url = import.meta.env.VITE_BACKEND_BASE_URL;
      const response = await axios.get(`${Base_Url}/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
        },
      });
      console.log(response.data);
    }
    getUser();
  }, []);

  return (
    <div>
      <button onClick={() => setSelectedUserId(null)}>back</button>
    </div>
  );
};

export default ShowChat;
