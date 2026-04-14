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
import { snippets, optimisations } from "../data/fakeData.ts";
export const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState<{
    id: number;
    user_id: number;
    title: string;
    language: string;
    code: string;
    tags: string[];
    notes: string;
    created_at: Date;
    updated_at: Date;
  } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/dashboard");
      }
    });
    selectSnippet(1001);
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

  function selectSnippet(id) {
    snippets.forEach((snip) => {
      if (snip.id === id) {
        setSelectedSnippet(snip);
      }
    });
  }

  console.log(selectedSnippet);

  // if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="outer-container bg-emerald-300 h-screen w-screen p-8">
      <div className="inner-container bg-white h-full w-full rounded-2xl shadow-emerald-400 shadow-md flex p-8 flex-col">
        <div className="upper-buttons border-b-2 border-gray-200 w-full h-10 flex justify-between ">
          <Navbar />
          <Logout />
        </div>
        <div className="main-content w-full h-full flex py-8 ">
          <div className="main-content-left flex-1 border-r-2 border-gray-200 px-4">
            <Button text="Add New Byte" />
            <div className="items py-2 flex flex-col gap-2">
              {selectedSnippet !== null ? (
                snippets.map((snip) => {
                  return (
                    <Item
                      title={snip.title}
                      dateAdded={snip.created_at}
                      selectSnippet={() => {
                        selectSnippet(snip.id);
                      }}
                      selectedSnippetId={selectedSnippet.id}
                      id={snip.id}
                    />
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="main-content-right flex-5 w-full h-full flex px-4">
            <div className="flex flex-col w-full h-full items-start gap-3 flex-3">
              <h1 className="text-xl">Original Code:</h1>
              <CodeBlock />
              <h1 className="text-xl">Optimised Code:</h1>
              <CodeBlock />
              <Button text="Optimise Code" />
            </div>
            <div className="info-container flex-2 mx-2 flex flex-col h-full gap-6 justify-start border-l-2 border-gray-200 px-4">
              {/* INFO BLOCK */}
              <ContentBlock flex={"flex-1"}>
                {selectedSnippet === null ? (
                  <h1>No snippet selected</h1>
                ) : (
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <h1 className="text-3xl">{selectedSnippet.title}</h1>
                      <p className="px-3 rounded-2xl bg-emerald-300">
                        {selectedSnippet.language}
                      </p>
                    </div>
                    <div className="mb-6">
                      <div>
                        <p className="text-gray-500">
                          date created: {selectedSnippet.created_at.getDay()}
                          {"-"}
                          {selectedSnippet.created_at.getMonth()}
                          {"-"}
                          {selectedSnippet.created_at.getFullYear()}
                        </p>
                        <p className="text-gray-500">
                          last updated: {selectedSnippet.updated_at.getDay()}
                          {"-"}
                          {selectedSnippet.updated_at.getMonth()}
                          {"-"}
                          {selectedSnippet.updated_at.getFullYear()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      {selectedSnippet.tags.map((tag) => {
                        return (
                          <p className="text-sm px-3 rounded-2xl bg-emerald-100">
                            {tag}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
              </ContentBlock>
              {/* NOTE BLOCK */}
              <ContentBlock flex={"flex-1"}>
                <h1 className="text-2xl">Snippet Notes:</h1>
                <textarea
                  id="message"
                  rows={5}
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                  placeholder="Write your thoughts here..."
                  value={selectedSnippet !== null ? selectedSnippet.notes : ""}
                ></textarea>
              </ContentBlock>
              {/* OPTIMISATION BLOCK */}
              <ContentBlock flex={"flex-3"}>
                <div className="flex flex-col items-start h-full gap-2">
                  <h1 className="text-2xl">Optimisation Notes:</h1>
                  <textarea
                    id="message"
                    rows={5}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>
              </ContentBlock>
              {/* BUTTON BLOCK */}
              <div className="flex justify-around items-end h-fit">
                <Button
                  text="Delete"
                  color="text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-black"
                />
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
