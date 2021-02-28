import Link from "next/link";
import Image from "next/image";
const PostCard = ({ articles }) => {
  return (
    <div>
      <ul>
        {articles.length > 0
          ? articles.map((el) => {
              return (
                <li key={el.title}>
                  <div className="cardContainer">
                    <Link
                      test="test"
                      href={{
                        pathname: `/posts/${el.title}`,
                        query: { title: el.title },
                      }}
                    >
                      <div className="card">
                        <div className="image">
                          <h2 className="title-text-with-dots">{el.title}</h2>
                        </div>
                        <p className="text-with-dots">{el.content}</p>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default PostCard;
