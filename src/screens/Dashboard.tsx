import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase.tsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button.tsx";
import { Navbar } from "../components/Navbar.tsx";
import { Logout } from "../components/Logout.tsx";
import { Item } from "../components/Item.tsx";
import { CodeBlock } from "../components/CodeBlock.tsx";
import { ContentBlock } from "../components/ContentBlock.tsx";
export const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  // if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="outer-container bg-emerald-300 h-screen w-screen p-8">
      <div className="inner-container bg-white h-full w-full rounded-2xl shadow-emerald-400 shadow-md flex p-8 flex-col">
        <div className="upper-buttons border-b-2 border-gray-200 w-full h-12 flex justify-between ">
          <Navbar />
          <div className="rounded-2xl bg-emerald-300 h-fit px-8">
            <p className="text-white">email@email.com</p>
          </div>
          <Logout />
        </div>
        <div className="main-content w-full h-full flex py-8 ">
          <div className="main-content-left flex-1 border-r-2 border-gray-200 px-4">
            <Button
              text="Add New Byte"
              svg={
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 ml-2"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              }
            />
            <div className="items py-2 flex flex-col gap-2">
              <Item />
              <Item />
              <Item />
              <Item />
              <Item />
            </div>
          </div>
          <div className="main-content-right flex-5 w-full h-full flex px-4">
            <CodeBlock />
            <div className="info-container flex-1 mx-2 flex flex-col h-full gap-6 justify-start border-l-2 border-gray-200 px-4">
              <ContentBlock>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl">The title of the snippet active</h1>
                  <p>Language Tag</p>
                </div>
                <div>
                  <div>
                    <p>date created: 123911</p>
                    <p>last updated: 129319</p>
                  </div>
                </div>
                <div className="flex justify-end gap-6">
                  <p>tag 1</p>
                  <p>tag 2</p>
                  <p>tag 3</p>
                </div>
              </ContentBlock>
              <ContentBlock flex={"flex-2"}>
                <div className="flex">
                  <h1>Snippet Notes:</h1>
                </div>
                <textarea
                  id="message"
                  rows={10}
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                  placeholder="Write your thoughts here..."
                ></textarea>
              </ContentBlock>
              <div className="flex justify-around flex-2 items-end">
                <Button text="Delete" />
                <Button text="Edit" />
                <Button text="Save" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
