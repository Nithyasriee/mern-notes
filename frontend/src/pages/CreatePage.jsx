import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"; 
import { toast } from "react-hot-toast";
import api from "../lib/axios";
import { Link, useNavigate } from "react-router";
const CreatePage = () => {
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
      e.preventDefault();
      if(!title.trim() || !content.trim()){
        toast.error("Memoir cannot be empty :(");
        return;
      } 
      setLoading(true);
      try{
        await api.post("/notes",{
          title,
          content 
        })
        toast.success("A new memoir is here!!",{
          icon:"🐝",
        });
        navigate("/")
      }catch(error){
        console.log("Error creating memooir",error);
        if(error.response.status === 429){
          toast.error("OH NO! Slow down, we can't spam memoirs :(",{
            duration: 4000,
              icon: "💀",
          });
        }else{
          toast.error("Memoir was not created :(");
        }
      }finally{
        setLoading(false);
      } 
  };

  return <div className="min-h-screen bg-base-200">
    <div className="container mx-auto px-4  py-8"> 
      <div className="max-w-2xl mx-auto">
        <Link to={"/"} className="btn btn-primary mb-6">
          <ArrowLeftIcon className="size-5"/>
          Back to Notes
        </Link>
        <div className="card bg-base-300 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered bg-base-200" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea placeholder="Create your memoir here..." className="textarea textarea-bordered h-32 bg-base-200" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-accent" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
            
                </form> 
          </div>
        </div>
      </div>
    </div>
  </div>
  
};

export default CreatePage;
