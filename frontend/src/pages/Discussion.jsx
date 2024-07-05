import PersonIcon from "../assets/personicon.jpg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Discussion = ({ user }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [replyCommentIndex, setReplyCommentIndex] = useState(null);
  const [likedComments, setLikedComments] = useState({});

  useEffect(() => {
    // Fetch the list of registered users when the component mounts
    axios.get('https://diy-server.onrender.com/users/')
      .then(response => {
        setRegisteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching registered users:', error);
      });

    // Fetch the list of discussions when the component mounts
    axios.get('https://diy-server.onrender.com/discussions/')
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching discussions:', error);
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

    if (editCommentIndex !== null) {
      // Edit an existing comment
      const commentToUpdate = comments[editCommentIndex];
      const updatedComment = {
        ...commentToUpdate,
        text: comment,
      };
      axios.put(`https://diy-server.onrender.com/discussions/${commentToUpdate._id}`, updatedComment)
        .then(response => {
          const updatedComments = comments.map((c, index) =>
            index === editCommentIndex ? response.data : c
          );
          setComments(updatedComments);
          setEditCommentIndex(null);
          setComment(''); // Clear the textarea
        })
        .catch(error => {
          console.error('Error updating comment:', error);
        });
    } else {
      // Add a new comment
      const newComment = {
        text: comment,
        username: user.username,
        replies: [],
        likes: 0,
        createdAt: new Date(),
      };

      axios.post('https://diy-server.onrender.com/discussions/', newComment)
        .then(response => {
          setComments([...comments, response.data]);
          setComment(''); // Clear the textarea
        })
        .catch(error => {
          console.error('Error posting comment:', error);
        });
    }
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setComment(comments[index].text);
  };

  const handleDeleteComment = (index) => {
    const commentToDelete = comments[index];
    axios.delete(`https://diy-server.onrender.com/discussions/${commentToDelete._id}`)
      .then(() => {
        setComments(comments.filter((_, i) => i !== index));
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleReplyComment = (index) => {
    setReplyCommentIndex(index);
    setComment('');
  };

  const handleLikeComment = (index) => {
    const commentToLike = comments[index];

    // Check if the current user is the author of the comment
    if (commentToLike.username === user.username) {
      alert('Error: You cannot like your own comment.');
      return;
    }

    const updatedComment = {
      ...commentToLike,
      likes: commentToLike.likes + 1,
    };

    axios.put(`https://diy-server.onrender.com/discussions/${commentToLike._id}`, updatedComment)
      .then(response => {
        const updatedComments = comments.map((c, i) =>
          i === index ? response.data : c
        );
        setComments(updatedComments);
        setLikedComments({ ...likedComments, [commentToLike._id]: true });
      })
      .catch(error => {
        console.error('Error liking comment:', error);
      });
  };

  const handlePostReply = (index) => {
    const commentToReply = comments[index];

    // Check if the current user is the author of the comment
    if (commentToReply.username === user.username) {
      alert('Error: You cannot reply to your own comment.');
      return;
    }

    const replyText = prompt('Enter your reply:');
    if (!replyText) {
      return;
    }

    const newReply = {
      text: replyText,
      username: user.username,
      createdAt: new Date(),
    };

    const updatedComment = {
      ...commentToReply,
      replies: [...commentToReply.replies, newReply],
    };

    axios.put(`https://diy-server.onrender.com/discussions/${commentToReply._id}`, updatedComment)
      .then(response => {
        const updatedComments = comments.map((c, i) =>
          i === index ? response.data : c
        );
        setComments(updatedComments);
      })
      .catch(error => {
        console.error('Error replying to comment:', error);
      });
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
              onClick={() => {
                setComment('');
                setEditCommentIndex(null);
                setReplyCommentIndex(null);
              }}>
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
                  <button
                    className={`text-blue-500 hover:text-blue-700 flex items-center ${likedComments[comment._id] ? 'text-gray-400' : ''}`}
                    onClick={() => handleLikeComment(index)}
                    disabled={likedComments[comment._id]}
                  >
                    <i className='fas fa-thumbs-up'></i>
                    <span className='ml-1'>Like ({comment.likes})</span>
                  </button>
                  <button
                    className='text-blue-500 hover:text-blue-700 flex items-center'
                    onClick={() => handlePostReply(index)}
                  >
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
