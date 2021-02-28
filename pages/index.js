import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import axios from "axios";
import { connectToDatabase } from "../middleware/database";

import PostCard from "../components/PostCard";

const Home = ({ articles }) => {
  return (
    <div>
      <Head>
        <title>News App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="content">
        <PostCard articles={articles} />
      </div>
      <Link href={`/create`}>
        <button className="create-article-button">Create article</button>
      </Link>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase();
  const res = await db
    .collection("articles")
    .find({}, { projection: { _id: 0 } });
  const articles = await res.toArray();
  await res.close();
  return {
    props: {
      articles: articles,
    },
  };
};

export default Home;
