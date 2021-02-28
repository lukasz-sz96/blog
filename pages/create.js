import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

import { useSession, signIn, signOut } from "next-auth/client";

const Create = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const imageRef = useRef();
  const contentRef = useRef();
  const titleRef = useRef();

  const publish = async () => {
    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const imageUrl = imageRef.current.value;
    if (imageUrl && content && imageUrl) {
      if (
        (imageUrl.includes("i.imgur.com") && imageUrl.endsWith(".png")) ||
        imageUrl.endsWith(".jpg") ||
        imageUrl.endsWith(".jpeg")
      ) {
        const doesTitleExist = await axios.get(
          `https://${window.location.host}/api/post`,
          {
            params: {
              title: title,
            },
          }
        );
        if (!doesTitleExist.data.isDuplicated) {
          await axios.post(`https://${window.location.host}/api/post`, {
            title: title,
            content: content,
            imageUrl: imageUrl,
          });
        } else {
          alert("Article title must be unique.");
        }
      } else {
        alert("Incorrect image URL.");
      }
    } else {
      alert("You need to fill out all of the boxes.");
    }
  };

  if (session) {
    return (
      <>
        <Header />
        <div className="create-article">
          <div className="form">
            <form>
              <label>Article title</label>
              <br />
              <input ref={titleRef} type="text" placeholder="Title"></input>
              <br />
              <label>Image URL</label>
              <br />
              <input
                ref={imageRef}
                type="text"
                placeholder="Image URL (Imgur Only)"
                defaultValue="https://i.imgur.com/rA15Gpu.jpeg"
              ></input>
              <br />
              <label>Article Content</label>
              <br />
              <textarea
                ref={contentRef}
                type="text"
                placeholder="Content"
              ></textarea>
            </form>

            <button
              className="create-article-button"
              onClick={() => {
                publish();
                router.push("/");
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="create-article">
      <h2>NO ACCESS</h2>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Create;
