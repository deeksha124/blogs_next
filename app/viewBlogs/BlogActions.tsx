// "use client"; // This marks the component as a Client Component

// import React from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";
// // import { useRouter } from "next/navigation";

// interface Post {
//   blog_id: string;
//   title: string;
// }

// interface BlogActionsProps {
//   post: Post;
// }

// const BlogActions: React.FC<BlogActionsProps> = ({ post }) => {
//   const router = useRouter();

//  const deletePost = async () => {
//     // Show a SweetAlert2 confirmation dialog
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, keep it",
//       confirmButtonColor: "#e74c3c", // Red color for confirmation
//       cancelButtonColor: "#2ecc71", // Green color for cancel button
//       reverseButtons: true, // Reverse the position of the buttons
//     });

//     // If the user confirms the deletion
//     if (result.isConfirmed) {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//       if (!apiUrl) throw new Error("API URL is not defined");

//       // Proceed with the API call to delete the post
//       const response = await fetch(`${apiUrl}/blog/delete/${post.blog_id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         // If the deletion fails, show an error toast
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Failed to delete the post. Please try again later.",
//         });
//         return;
//       }

//       // Show success message
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "The post has been deleted successfully.",
//       });

//       // Refresh the page after deletion
//       router.refresh();
//     } else {
//       // If the user cancels, show a message
//       Swal.fire({
//         icon: "info",
//         title: "Cancelled",
//         text: "The post was not deleted.",
//       });
//     }
//   };

//   const handlePreview = () => {
//     // Open the preview page in a new tab
//     window.open(`/viewBlogs/${post.blog_id}`, "_blank");
//   };

//   const handleUpdate = () => {
//     // Open the update page in a new tab
//     window.open(`/updateBlog/${post.blog_id}`, "_blank");
//   };

//   return (
//     <div
//       className="actionButtons"
//       style={{ display: "flex", alignItems: "center" }}
//     >
//       <img
//         src="/icons/eye.png" // Path to your preview icon
//         alt="Preview"
//         onClick={handlePreview}
//         style={{
//           cursor: "pointer",
//           marginRight: "10px",
//           width: "24px",
//           height: "24px",
//         }} // Adjust size as needed
//       />
//       <img
//         src="/icons/edit.png" // Path to your update icon
//         alt="Update"
//         onClick={handleUpdate}
//         style={{
//           cursor: "pointer",
//           marginRight: "10px",
//           width: "24px",
//           height: "24px",
//         }} // Adjust size as needed
//       />
//       <img
//         src="/icons/delete.png" // Path to your delete icon
//         alt="Delete"
//         onClick={deletePost}
//         style={{ cursor: "pointer", width: "24px", height: "24px" }} // Adjust size as needed
//       />
//     </div>
//   );
// };

// export default BlogActions;

// //========================================================================================================================

"use client"; // This marks the component as a Client Component

import React from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Post {
  blog_id: string;
  title: string;
}

interface BlogActionsProps {
  post: Post;
}

const BlogActions: React.FC<BlogActionsProps> = ({ post }) => {
  const router = useRouter();

  // Delete post function
  const deletePost = async () => {
    // Show a SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      confirmButtonColor: "#e74c3c", // Red color for confirmation
      cancelButtonColor: "#2ecc71", // Green color for cancel button
      reverseButtons: true, // Reverse the position of the buttons
    });

    // If the user confirms the deletion
    if (result.isConfirmed) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) throw new Error("API URL is not defined");

      // Proceed with the API call to delete the post
      const response = await fetch(`${apiUrl}/blog/delete/${post.blog_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        // If the deletion fails, show an error toast
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to delete the post. Please try again later.",
        });
        return;
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The post has been deleted successfully.",
      });

      // Refresh the page after deletion
      router.refresh();
    } else {
      // If the user cancels, show a message
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "The post was not deleted.",
      });
    }
  };

  // Handle Preview
  const handlePreview = () => {
    window.open(`/viewBlogs/${post.blog_id}`, "_blank");
  };

  // Handle Update
  const handleUpdate = () => {
    window.open(`/updateBlog/${post.blog_id}`, "_blank");
  };

  // Handle Create Blog
  const handleCreate = () => {
    window.open("/addBlog", "_blank"); // Redirect to the "Add Blog" page
  };

  return (
    <div>
      {/* Create Button */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000, // Ensure it stays on top
        }}
      >
        <button
          onClick={handleCreate}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db", // Blue background for create button
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Create New Blog
        </button>
      </div>

      {/* Action Buttons */}
      <div
        className="actionButtons"
        style={{ display: "flex", alignItems: "center", marginTop: "60px" }} // Adjust margin for positioning
      >
        {/* Preview button */}
        <img
          src="/icons/eye.png" // Path to your preview icon
          alt="Preview"
          onClick={handlePreview}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            width: "24px",
            height: "24px",
          }}
        />

        {/* Update button */}
        <img
          src="/icons/edit.png" // Path to your update icon
          alt="Update"
          onClick={handleUpdate}
          style={{
            cursor: "pointer",
            marginRight: "10px",
            width: "24px",
            height: "24px",
          }}
        />

        {/* Delete button */}
        <img
          src="/icons/delete.png" // Path to your delete icon
          alt="Delete"
          onClick={deletePost}
          style={{
            cursor: "pointer",
            width: "24px",
            height: "24px",
          }}
        />
      </div>
    </div>
  );
};

export default BlogActions;
