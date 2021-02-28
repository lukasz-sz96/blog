import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { connectToDatabase } from "../../middleware/database";

import Header from "../../components/Header";
const Post = ({ title, content, imageUrl }) => {
  return (
    <div>
      <Header />

      <div className="article">
        {imageUrl ? (
          <div className="article-image">
            <Image
              objectFit={"cover"}
              src={imageUrl}
              layout="fill"
            />
            <h1>{title}</h1>
          </div>
        ) : null}
        <p>{content}</p>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const postTitle = context.params.post;
  const { db } = await connectToDatabase();
  const res = await db.collection("articles").findOne({ title: postTitle });
  return {
    props: {
      title: res.title,
      content: res.content,
      imageUrl: res.imageUrl,
    },
  };
};

export default Post;
