
import React, { useRef, useState } from "react";
import AWS from "aws-sdk";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
}));

const ImagePreview = styled(Box)({
  width: "100%",
  height: "200px",
  marginTop: "10px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
});

const StyledUploadImage = ({ label, placeholder, onChange }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setSelectedImage(URL.createObjectURL(file));
    //   onChange && onChange(file);
    }
  };

  const uploadFile = async () => {
    const S3_BUCKET = "school-counselling";
    const REGION = "ap-south-1";

    AWS.config.update({
      accessKeyId: "AKIAZQ3DOONQI5LA2Y6G",
      secretAccessKey: "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",
      region: REGION,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
    //   console.log("File uploaded successfully:", data.Location);
      onChange(data.Location);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        placeholder={placeholder}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      {selectedImage && (
        <ImagePreview style={{ backgroundImage: `url(${selectedImage})` }} />
      )}
      {file && <button onClick={uploadFile}>Upload</button>}
    </>
  );
};

export default StyledUploadImage;
