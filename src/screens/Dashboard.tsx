import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "../components/Button.tsx";
import { Navbar } from "../components/Navbar.tsx";
import { Logout } from "../components/Logout.tsx";
import { Item } from "../components/Item.tsx";
import { CodeBlock } from "../components/CodeBlock.tsx";
import { ContentBlock } from "../components/ContentBlock.tsx";
import { snippets, optimisations } from "../data/fakeData.ts";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { auth, database } from "../firebase.tsx";

type optimisationType = {
  id: number;
  snippet_id: number;
  improved_code: string;
  explanation: string;
  created_at: Date;
};
type snippetType = {
  id: number;
  user_id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  notes: string;
  created_at: Date;
  updated_at: Date;
};

export const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedSnippet, setSelectedSnippet] = useState<snippetType | null>(
    null,
  );
  const [selectedOptimisation, setSelectedOptimisation] = useState<{
    id: number;
    snippet_id: number;
    improved_code: string;
    explanation: string;
    created_at: Date;
  } | null>(null);
  const [data, setData] = useState<{
    optimsations: optimisationType[];
    snippets: snippetType[];
  }>(null);
  const navigate = useNavigate();
  const collectionRef = ref(database, "data");

  const fetchData = (ref) => {
    let prevData = [];
    onValue(ref, (snapshot) => {
      const dataItem = snapshot.val();
      if (dataItem) {
        prevData = dataItem;
        setData(dataItem);
        setSelectedSnippet(dataItem.snippets[0]);
      }
    });
    return prevData;
  };

  const setUpData = (uid) => {
    let data = {};
    const setupSnipId = Math.round(Math.random() * 1000000);
    data[uid] = {
      snippets: [
        {
          id: setupSnipId,
          user_id: uid,
          title: "New Code Snippet",
          language: "Not Set",
          code: `Code not added yet`,
          tags: [],
          notes: "Notes not added yet",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      optimisations: [
        {
          id: Math.round(Math.random() * 1000000),
          snippet_id: setupSnipId,
          improved_code: "No optimised code added yet",
          explanation: "No optimisation made yet",
          created_at: new Date(),
        },
      ],
    };
    update(collectionRef, data);
  };

  const addNewSnippet = (uid) => {
    const snippetsRef = ref(database, `data`);
    const prevData = fetchData(snippetsRef);
    const newData = [
      ...prevData[0],
      {
        id: Math.random() * 100000,
        user_id: uid,
        title: "New Code Snippet",
        language: "Not Set",
        code: `Code not added yet`,
        tags: ["new byte"],
        notes: "Notes not added yet",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    update(snippetsRef, {
      id: uid,
      snippets: newData,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const userDataRef = ref(database, `data/${user.uid}`);
        const d = fetchData(userDataRef);
        if (d.length === 0) {
          setUpData(user.uid);
        }
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

  function selectSnippet(id) {
    if (data !== null) {
      data.snippets.forEach((snip) => {
        if (snip.id === id) {
          setSelectedSnippet(snip);
        }
      });
      data.optimsations.forEach((opti) => {
        if (opti.snippet_id === id) {
          setSelectedOptimisation(opti);
        }
      });
    }
  }

  if (!currentUser && !data)
    return (
      <div className="outer-container bg-emerald-300 h-screen w-screen p-6">
        <div className="inner-container h-full w-full rounded-2xl flex p-8 justify-center items-center">
          <h1 className="text-4xl text-white">Loading...</h1>
        </div>
      </div>
    );

  return (
    <div className="outer-container bg-emerald-300 h-screen w-screen p-6">
      <div className="inner-container bg-white h-full w-full rounded-2xl shadow-emerald-400 shadow-md flex p-8 flex-col">
        <div className="upper-buttons border-b-2 border-gray-200 w-full h-10 flex justify-between ">
          {currentUser ? <Navbar currentUser={currentUser} /> : <></>}
          <Logout handleLogout={handleLogout} />
        </div>
        <div className="main-content w-full h-full flex py-8 ">
          <div className="main-content-left flex-1 border-r-2 border-gray-200 px-4">
            <Button
              text="Add New Byte"
              onClick={() => {
                addNewSnippet(currentUser.uid);
              }}
            />
            <div className="items py-2 flex flex-col gap-2">
              {data !== null ? (
                data.snippets.map((snip) => {
                  return (
                    <Item
                      title={snip.title}
                      dateAdded={new Date(snip.created_at)}
                      selectSnippet={() => {
                        selectSnippet(snip.id);
                      }}
                      selectedSnippetId={selectedSnippet.id}
                      id={snip.id}
                      language={snip.language}
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
              {selectedSnippet !== null ? (
                <CodeBlock value={selectedSnippet.code} />
              ) : (
                <CodeBlock />
              )}
              <h1 className="text-xl">Optimised Code:</h1>
              {selectedOptimisation !== null ? (
                <CodeBlock value={selectedOptimisation.improved_code} />
              ) : (
                <CodeBlock />
              )}
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
                          date created:{" "}
                          {new Date(selectedSnippet.created_at).getDay()}
                          {"-"}
                          {new Date(selectedSnippet.created_at).getMonth()}
                          {"-"}
                          {new Date(selectedSnippet.created_at).getFullYear()}
                        </p>
                        <p className="text-gray-500">
                          last updated:{" "}
                          {new Date(selectedSnippet.updated_at).getDay()}
                          {"-"}
                          {new Date(selectedSnippet.updated_at).getMonth()}
                          {"-"}
                          {new Date(selectedSnippet.updated_at).getFullYear()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      {selectedSnippet.tags &&
                        selectedSnippet.tags.map((tag) => {
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
                  <h1 className="text-2xl">Optimisation Explanation:</h1>
                  <textarea
                    id="message"
                    rows={5}
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                    placeholder="Write your thoughts here..."
                    value={
                      selectedOptimisation !== null
                        ? selectedOptimisation.explanation
                        : ""
                    }
                  ></textarea>
                </div>
              </ContentBlock>
              <ContentBlock flex={"flex-3 flex-col gap-6"}>
                <div className="flex justify-between">
                  <h2>Add Tag:</h2>
                  <input type="text" name="" id="" />
                </div>
                <div className="flex justify-between">
                  <h2>Change Language:</h2>
                  <input type="text" name="" id="" />
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
