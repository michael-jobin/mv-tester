import React from 'react'

interface MediaInputProps {
  handleMediaUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const MediaInput: React.FC<MediaInputProps> = ({ handleMediaUpload }) => {
  return (
    <div className="app_inputFile mb-3">
      <input
        type="file"
        accept="video/mp4,image/jpg,image/jpeg,image/png,image/webp"
        onChange={handleMediaUpload}
        className="form-control"
        id="inputGroupFile01"
      />
      <p className="input--file__label mt-1 text-light">
        <small>(mp4, jpg, jpeg, png, webp)</small>
      </p>
    </div>
  )
}

export default MediaInput
