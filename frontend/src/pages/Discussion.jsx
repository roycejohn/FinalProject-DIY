import PersonIcon from "../assets/personicon.jpg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Discussion = ({ user }) => {
   const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [replyCommentIndex, setReplyCommentIndex] = useState(null);

  useEffect(() => {
    // Fetch the list of registered users when the component mounts
    axios.get('http://localhost:8000/users/')
      .then(response => {
        setRegisteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching registered users:', error);
      });
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePostComment = () => {
    if (!user) {
      alert('Error: You must be logged in to post a comment.');
      setComment(''); // Clear the textarea
      return;
    }

    // Check if the current user is in the list of registered users
    const isValidUser = registeredUsers.some(registeredUser => registeredUser.username === user.username);

    if (!isValidUser) {
      alert('Error: Only valid users can have discussions.');
      setComment(''); // Clear the textarea
      return;
    }

    // Proceed to post the comment if the user is valid
    if (editCommentIndex !== null) {
      // Edit the comment
      const updatedComments = comments.map((c, index) =>
        index === editCommentIndex ? { ...c, text: comment } : c
      );
      setComments(updatedComments);
      setEditCommentIndex(null);
    } else if (replyCommentIndex !== null) {
      // Reply to the comment
      const updatedComments = comments.map((c, index) =>
        index === replyCommentIndex
          ? { ...c, replies: [...(c.replies || []), { text: comment, username: user.username }] }
          : c
      );
      setComments(updatedComments);
      setReplyCommentIndex(null);
    } else {
      // Add a new comment
      setComments([...comments, { text: comment, username: user.username }]);
    }
    setComment('');
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setComment(comments[index].text);
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleReplyComment = (index) => {
    setReplyCommentIndex(index);
    setComment('');
  };

  return (
    <div className='max-w-4xl mx-auto px-4'>
      <h3 className='text-xl font-semibold'>Discussion Page</h3>
      <div className='container mx-auto mt-4 p-4'>
        <div className='bg-white shadow-md rounded-lg p-6 mb-8'>
          <div className='flex items-center mb-4'>
            <img
              src={PersonIcon}
              alt={user ? user.username : 'User Icon'}
              className='w-12 h-12 rounded-full mr-4'
            />
            <div>
              <h2 className='text-lg font-semibold'>{user ? user.username : 'Guest'}</h2>
            </div>
          </div>
          <textarea
            className='w-full border rounded p-2'
            rows='4'
            placeholder='Type here...'
            value={comment}
            onChange={handleCommentChange}></textarea>
          <p className='text-sm text-gray-500 mb-2'>
            Please feel free to share your ideas and thoughts.
          </p>
          <div className='flex justify-between'>
            <button className='bg-blue-500 text-white rounded p-2 mt-2'
              onClick={() => setComment('')}>
              Cancel
            </button>
            <button className='bg-blue-500 text-white rounded p-2 mt-2' onClick={handlePostComment}>
              {editCommentIndex !== null ? 'Update' : 'Post'}
            </button>
          </div>
        </div>

        <div>
          <h2 className='text-2xl font-semibold mb-4'>Recent Conversations</h2>
        </div>

        {/* Render the list of comments */}
        <div className='mt-4'>
          {comments.map((comment, index) => (
            <div key={index} className='bg-gray-100 p-4 rounded mb-2 shadow'>
              <div className='flex items-center mb-2'>
                <img
                  src={PersonIcon}
                  alt={comment.username}
                  className='w-8 h-8 rounded-full mr-4'
                />
                <div>
                  <h2 className='text-md font-semibold'>{comment.username}</h2>
                  <p>{comment.text}</p>
                  {comment.replies && comment.replies.map((reply, i) => (
                    <div key={i} className='ml-8 mt-2'>
                      <h2 className='text-md font-semibold'>{reply.username}</h2>
                      <p>{reply.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <div className='flex space-x-4'>
                  <button className='text-blue-500 hover:text-blue-700 flex items-center'>
                    <i className='fas fa-thumbs-up'></i>
                    <span className='ml-1'>Like</span>
                  </button>
                  <button className='text-blue-500 hover:text-blue-700 flex items-center' onClick={() => handleReplyComment(index)}>
                    <i className='fas fa-reply'></i>
                    <span className='ml-1'>Reply</span>
                  </button>
                </div>
                <div className='flex space-x-4'>
                  <button className='text-yellow-500 hover:text-yellow-700 flex items-center' onClick={() => handleEditComment(index)}>
                    <i className='fas fa-edit'></i>
                    <span className='ml-1'>Edit</span>
                  </button>
                  <button className='text-red-500 hover:text-red-700 flex items-center' onClick={() => handleDeleteComment(index)}>
                    <i className='fas fa-trash'></i>
                    <span className='ml-1'>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
