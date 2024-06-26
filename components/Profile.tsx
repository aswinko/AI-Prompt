import PromptCard from "@/components/PromptCard";

// Define the types for the props
interface ProfileProps {
  name: string;
  desc: string;
  data: Array<any>; // You can replace 'any' with a specific type if you have one for the posts
  handleEdit?: (post: any) => void; // Optional function type
  handleDelete?: (post: any) => void; // Optional function type
}

const Profile: React.FC<ProfileProps> = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post: any) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
