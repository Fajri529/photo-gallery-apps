import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = async (e) => {
    e.preventDefault();
    // TODO: answer here
    await fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        imageUrl,
        captions,
        createdAt: "16/12/2023",
        updatedAt: "16/12/2022",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => (json));
    navigate("/photos");
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    const dataImageUrl = async () => {
      try {
        await fetch(`https://gallery-app-server.vercel.app/photos/${id}`)
          .then((response) => response.json()) 
          .then((json) => setImageUrl(json.imageUrl))
          .then((json) => setCaptions(json.captions)) 
      }
      catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    dataImageUrl();
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default??EditPhoto;