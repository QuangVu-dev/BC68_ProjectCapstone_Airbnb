import React, { useState } from "react";
import "../../components/sass/pages/ratingStarForm.scss";
import IconStar from "../../assets/iconStar/IconStar";
import { Col, Row, Space } from "antd";
import { commentRoomDetailService } from "../../services/commentRoomDetail.service";

const RatingSlider = ({ star, value, totalComments }) => {
  const percentage = totalComments > 0 ? (value / totalComments) * 100 : 0;

  return (
    <Row
      align="middle"
      style={{ margin: 0, display: "flex", alignItems: "center" }}
    >
      <Col style={{ marginRight: "16px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          {star} <IconStar />
        </span>
      </Col>
      <Col span={12} style={{ margin: 0 }}>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            height: "10px",
            width: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffcc00", // Màu vàng cho thanh đánh giá
              height: "100%",
              width: `${percentage}%`,
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </Col>
      <Col span={8} style={{ marginLeft: "16px" }}>
        <div>
          {value} review{value !== 1 && value > 0 ? "s" : ""}
        </div>
      </Col>
    </Row>
  );
};

const RatingStarForm = ({ comments, onNewComment, roomId }) => {
  const totalComments = comments.length;
  const averageRating = totalComments
    ? comments.reduce((sum, comment) => sum + comment.saoBinhLuan, 0) /
      totalComments
    : 0;

  const ratingCounts = {};
  comments.forEach((comment) => {
    const star = comment.saoBinhLuan;
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const [showForm, setShowForm] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formValues, setFormValues] = useState({
    noiDung: "",
    tenNguoiBinhLuan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Cấu trúc dữ liệu để gửi lên API
    const newComment = {
      id: 0,
      maPhong: roomId,
      maNguoiBinhLuan: 0,
      ngayBinhLuan: new Date().toISOString(),
      noiDung: formValues.noiDung.trim(),
      saoBinhLuan: userRating,
      tenNguoiBinhLuan: formValues.tenNguoiBinhLuan,
    };
    const token = localStorage.getItem("token");

    try {
      await commentRoomDetailService.addComment(token, newComment);
      onNewComment(newComment);
      setFormValues({ noiDung: "", tenNguoiBinhLuan: "" });
      setUserRating(0);
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response ? error.response.data : error
      );
    }
  };

  const handleRatingClick = (value) => {
    setUserRating(value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="rating-star-form mb-10">
      <div className="rating-star-review">
        <div className="rsr__left flex justify-center flex-col">
          <p className="text-4xl font-bold text-red-600">
            {Math.round(averageRating) > 0 ? Math.round(averageRating) : 0}
          </p>
          <div
            className="flex justify-center text-yellow-500"
            name="saoBinhLuan"
          >
            {Array.from({ length: Math.round(averageRating) }).map(
              (_, index) => (
                <IconStar key={index} />
              )
            )}
          </div>
          <div className="text-sm">
            {totalComments > 0
              ? `There are ${totalComments} reviews`
              : "There is no review"}
          </div>
        </div>
        <div className="rsr__right">
          <Space direction="vertical" style={{ width: "100%" }}>
            {[5, 4, 3, 2, 1].map((star) => (
              <RatingSlider
                key={star}
                star={star}
                value={ratingCounts[star] || 0}
                totalComments={totalComments}
              />
            ))}
          </Space>
        </div>
        <div className="rsr__right">
          <button
            onClick={toggleForm}
            className="btn btn-blue btn-effect-default"
          >
            Submit Your Review
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} method="POST" autoComplete="off">
          <div className="flex items-center my-4">
            <span className="pr-3">Select your rating</span>
            <div className="flex flex-row text-3xl">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  data-rating-value={value}
                  className={`${userRating >= value ? "active" : ""}`}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRatingClick(value);
                  }}
                >
                  <div
                    style={{
                      color:
                        value === 1 ||
                        userRating >= value ||
                        hoverRating >= value
                          ? "#FFBE02"
                          : "#D2D2D2",
                    }}
                  >
                    <IconStar />
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <textarea
                name="noiDung"
                className="form_control"
                rows={5}
                required
                placeholder="Content"
                defaultValue={""}
                value={formValues.noiDung}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1 flex flex-col justify-between">
              <input
                name="tenNguoiBinhLuan"
                type="text"
                className="form_control"
                placeholder="Your name"
                required
                value={formValues.tenNguoiBinhLuan}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="btn btn-blue btn-effect-default mb-2"
              >
                Add comment
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RatingStarForm;
