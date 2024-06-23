import service from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useState, useEffect } from "react";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  service.listDocuments([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard key={post.$id} post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
