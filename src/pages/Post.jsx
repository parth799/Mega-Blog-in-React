import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Container } from "postcss";
import {Button} from "../components";
function Post() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getDocument(slug).then((post) => {
        if (post) setPosts(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deletePost(post.featuredInmage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFile(post.featuredInmage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute rignt-6 top-6">
              <Link to={`/edit-post/$${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="e-full mb-6">
          <h1 className="text-2xl font-bold">
            {post.title}
          </h1>
        </div>
        <div className="browser-css">{parse.apply(post.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
