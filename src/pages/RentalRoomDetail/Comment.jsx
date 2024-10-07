import React, { useEffect, useState } from "react";
import { commentRoomDetailService } from "../../services/commentRoomDetail.service";
import IconStar from "../../assets/iconStar/IconStar";
import { formatDistanceToNow } from "date-fns";
import RatingStarForm from "../../templates/FormTemplate/RatingStarForm";

const Comment = ({ roomId }) => {
  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    commentRoomDetailService
      .getAllCommentRoomDetailById(roomId)
      .then((res) => {
        console.log(res);
        setListComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNewComment = (newComment) => {
    setListComment((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div
      className="py-12"
      style={{
        borderTop: "1px solid rgb(221 221 221)",
      }}
    >
      <RatingStarForm
        comments={listComment}
        onNewComment={handleNewComment}
        roomId={roomId}
      />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5">
        {listComment.map((item, index) => {
          return (
            <div className="px-3">
              {/* info author  */}
              <div className="flex space-x-3 items-center my-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.avatar}
                  alt=""
                />
                {/* tên tác giả và ngày bình luận */}
                <div>
                  <h4 className="text-base font-extrabold">
                    {item.tenNguoiBinhLuan}
                  </h4>
                  <p className="text-sm font-thin" style={{ color: "#717171" }}>
                    {new Date(item.ngayBinhLuan).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* đánh giá */}
              <div className="space-x-2 flex justify-start mb-2">
                <div className="text-yellow-500 flex items-center space-x-1">
                  {[...Array(item.saoBinhLuan)].map((_, starIndex) => (
                    <IconStar key={starIndex} />
                  ))}
                </div>
                {/* Thời gian từ khi bình luận đến hiện tại */}
                <span className="text-sm" style={{ color: "#717171" }}>
                  {formatDistanceToNow(new Date(item.ngayBinhLuan), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              {/* nội dung */}
              <div className="font-normal">
                <span>{item.noiDung}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
