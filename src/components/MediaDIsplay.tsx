interface MediaDisplayProps {
  mediaSrc: string | null
  isVideo: boolean
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ mediaSrc, isVideo }) => {
  return (
    <div className="app__mediaContainer">
      {mediaSrc && isVideo && <video src={mediaSrc} loop muted autoPlay />}
      {mediaSrc && !isVideo && <img src={mediaSrc} alt="Uploaded media" />}
    </div>
  )
}

export default MediaDisplay
